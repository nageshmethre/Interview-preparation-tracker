package com.interviewtracker.service.impl;

import com.interviewtracker.entity.*;
import com.interviewtracker.exception.ResourceNotFoundException;
import com.interviewtracker.repository.*;
import com.interviewtracker.service.ReportService;

// Apache POI Excel Imports
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

// iText 7 PDF Imports
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Cell;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private ProgressRepository progressRepository;

    @Autowired
    private MockInterviewRepository mockInterviewRepository;

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
    }

    @Override
    public byte[] generatePdfReport(String email) {
        User user = getUserByEmail(email);
        List<Progress> progressLogs = progressRepository.findByUserId(user.getId());
        List<MockInterview> mockInterviews = mockInterviewRepository.findByUserId(user.getId());

        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(out);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            // Document Header
            document.add(new Paragraph("INTERVIEW PREPARATION TRACKER REPORT")
                    .setFontSize(20)
                    .setBold());
            document.add(new Paragraph("Generated on: " + LocalDate.now().format(DateTimeFormatter.ISO_DATE)));
            document.add(new Paragraph("Candidate Name: " + user.getName()));
            document.add(new Paragraph("Candidate Email: " + user.getEmail()));
            document.add(new Paragraph("\n"));

            // Section 1: Progress Metrics
            document.add(new Paragraph("1. STUDY AND SOLVING PROGRESS")
                    .setFontSize(14)
                    .setBold());
            
            float[] progressWidths = {2f, 1.5f, 1f, 1f, 1.5f};
            Table progressTable = new Table(progressWidths);
            progressTable.addHeaderCell("Topic");
            progressTable.addHeaderCell("Difficulty");
            progressTable.addHeaderCell("Completed");
            progressTable.addHeaderCell("Time (min)");
            progressTable.addHeaderCell("Date");

            for (Progress p : progressLogs) {
                progressTable.addCell(p.getTopic());
                progressTable.addCell(p.getDifficulty());
                progressTable.addCell(p.getCompleted() ? "Yes" : "No");
                progressTable.addCell(String.valueOf(p.getTimeSpent()));
                progressTable.addCell(p.getDate().toString());
            }
            document.add(progressTable);
            document.add(new Paragraph("\n"));

            // Section 2: Mock Interview Scores
            document.add(new Paragraph("2. MOCK INTERVIEW HISTORY")
                    .setFontSize(14)
                    .setBold());

            float[] mockWidths = {2f, 1f, 4f};
            Table mockTable = new Table(mockWidths);
            mockTable.addHeaderCell("Date");
            mockTable.addHeaderCell("Score");
            mockTable.addHeaderCell("Feedback & Recommendations");

            for (MockInterview m : mockInterviews) {
                mockTable.addCell(m.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
                mockTable.addCell(String.valueOf(m.getScore()) + "/100");
                mockTable.addCell(m.getFeedback() == null ? "No feedback logged" : m.getFeedback());
            }
            document.add(mockTable);

            document.close();
            return out.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Failed to generate PDF Report", e);
        }
    }

    @Override
    public byte[] generateExcelReport(String email) {
        User user = getUserByEmail(email);
        List<JobApplication> applications = jobApplicationRepository.findByUserId(user.getId());

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Job Applications Tracker");

            // Header Style
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.INDIGO.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            // Create Header Row
            Row headerRow = sheet.createRow(0);
            String[] headers = {"Application ID", "Company", "Target Role", "Current Status", "Applied Date"};
            for (int i = 0; i < headers.length; i++) {
                org.apache.poi.ss.usermodel.Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            // Populate rows
            int rowIdx = 1;
            for (JobApplication app : applications) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(app.getId());
                row.createCell(1).setCellValue(app.getCompany());
                row.createCell(2).setCellValue(app.getRole());
                row.createCell(3).setCellValue(app.getStatus());
                row.createCell(4).setCellValue(app.getAppliedDate().toString());
            }

            // Auto-size columns
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            return out.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Failed to generate Excel Report", e);
        }
    }
}
