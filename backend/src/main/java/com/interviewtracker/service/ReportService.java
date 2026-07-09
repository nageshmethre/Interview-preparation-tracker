package com.interviewtracker.service;

public interface ReportService {
    byte[] generatePdfReport(String email);
    byte[] generateExcelReport(String email);
}
