package services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

/**
 * Service class implementing direct MySQL JDBC CRUD queries for the tracker panels.
 */
public class TrackerService {
    private static final Logger logger = Logger.getLogger(TrackerService.class.getName());
    private static TrackerService instance;

    private TrackerService() {}

    public static synchronized TrackerService getInstance() {
        if (instance == null) {
            instance = new TrackerService();
        }
        return instance;
    }

    // --- Job Application Model ---
    public static class JobApplication {
        public int id;
        public String company;
        public String role;
        public String status;
        public String appliedDate;

        public JobApplication(int id, String company, String role, String status, String appliedDate) {
            this.id = id;
            this.company = company;
            this.role = role;
            this.status = status;
            this.appliedDate = appliedDate;
        }
    }

    // --- Study Plan Model ---
    public static class StudyPlan {
        public int id;
        public String title;
        public String targetCompany;
        public String startDate;
        public String endDate;
        public String status;

        public StudyPlan(int id, String title, String targetCompany, String startDate, String endDate, String status) {
            this.id = id;
            this.title = title;
            this.targetCompany = targetCompany;
            this.startDate = startDate;
            this.endDate = endDate;
            this.status = status;
        }
    }

    // --- CRUD: Job Applications ---

    public List<JobApplication> getJobApplications(Long userId) throws SQLException {
        List<JobApplication> list = new ArrayList<>();
        String sql = "SELECT id, company, role, status, applied_date FROM job_applications WHERE user_id = ? ORDER BY id DESC";

        try (Connection conn = DatabaseService.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setLong(1, userId);
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    list.add(new JobApplication(
                            rs.getInt("id"),
                            rs.getString("company"),
                            rs.getString("role"),
                            rs.getString("status"),
                            rs.getDate("applied_date").toString()
                    ));
                }
            }
        }
        return list;
    }

    public boolean addJobApplication(Long userId, String company, String role, String status, String dateStr) throws SQLException {
        String sql = "INSERT INTO job_applications (user_id, company, role, status, applied_date) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseService.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setLong(1, userId);
            pstmt.setString(2, company);
            pstmt.setString(3, role);
            pstmt.setString(4, status);
            pstmt.setDate(5, java.sql.Date.valueOf(dateStr));
            return pstmt.executeUpdate() > 0;
        }
    }

    public boolean updateJobApplication(int id, String company, String role, String status, String dateStr) throws SQLException {
        String sql = "UPDATE job_applications SET company = ?, role = ?, status = ?, applied_date = ? WHERE id = ?";
        try (Connection conn = DatabaseService.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, company);
            pstmt.setString(2, role);
            pstmt.setString(3, status);
            pstmt.setDate(4, java.sql.Date.valueOf(dateStr));
            pstmt.setInt(5, id);
            return pstmt.executeUpdate() > 0;
        }
    }

    public boolean deleteJobApplication(int id) throws SQLException {
        String sql = "DELETE FROM job_applications WHERE id = ?";
        try (Connection conn = DatabaseService.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            return pstmt.executeUpdate() > 0;
        }
    }

    // --- CRUD: Study Plans ---

    public List<StudyPlan> getStudyPlans(Long userId) throws SQLException {
        List<StudyPlan> list = new ArrayList<>();
        String sql = "SELECT id, title, target_company, start_date, end_date, status FROM study_plans WHERE user_id = ? ORDER BY id DESC";

        try (Connection conn = DatabaseService.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setLong(1, userId);
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    list.add(new StudyPlan(
                            rs.getInt("id"),
                            rs.getString("title"),
                            rs.getString("target_company") != null ? rs.getString("target_company") : "N/A",
                            rs.getDate("start_date").toString(),
                            rs.getDate("end_date").toString(),
                            rs.getString("status")
                    ));
                }
            }
        }
        return list;
    }

    public boolean addStudyPlan(Long userId, String title, String targetCompany, String startDate, String endDate, String status) throws SQLException {
        String sql = "INSERT INTO study_plans (user_id, title, target_company, start_date, end_date, status) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseService.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setLong(1, userId);
            pstmt.setString(2, title);
            pstmt.setString(3, targetCompany);
            pstmt.setDate(4, java.sql.Date.valueOf(startDate));
            pstmt.setDate(5, java.sql.Date.valueOf(endDate));
            pstmt.setString(6, status);
            return pstmt.executeUpdate() > 0;
        }
    }

    public boolean deleteStudyPlan(int id) throws SQLException {
        String sql = "DELETE FROM study_plans WHERE id = ?";
        try (Connection conn = DatabaseService.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            return pstmt.executeUpdate() > 0;
        }
    }

    // --- Stats: LeetCode Questions ---

    public int getQuestionsCount() {
        String sql = "SELECT COUNT(*) FROM interview_questions";
        try (Connection conn = DatabaseService.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {
            if (rs.next()) {
                return rs.getInt(1);
            }
        } catch (SQLException e) {
            logger.warning("Failed to count interview questions: " + e.getMessage());
        }
        return 0; // Fallback
    }

    public int getSolvedCount(Long userId) {
        String sql = "SELECT COUNT(*) FROM progress WHERE user_id = ? AND completed = 1";
        try (Connection conn = DatabaseService.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setLong(1, userId);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }
        } catch (SQLException e) {
            logger.warning("Failed to query solved count: " + e.getMessage());
        }
        return 0;
    }
}
