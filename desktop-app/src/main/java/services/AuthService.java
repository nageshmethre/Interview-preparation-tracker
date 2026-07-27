package services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Logger;
import org.mindrot.jbcrypt.BCrypt;

/**
 * Authentication service coordinating MySQL direct JDBC credentials checks using BCrypt.
 */
public class AuthService {
    private static final Logger logger = Logger.getLogger(AuthService.class.getName());
    private static AuthService instance;

    // Logged in User state
    private Long currentUserId;
    private String currentUsername;
    private String currentUserEmail;

    private AuthService() {}

    public static synchronized AuthService getInstance() {
        if (instance == null) {
            instance = new AuthService();
        }
        return instance;
    }

    public boolean isLoggedIn() {
        return currentUserId != null;
    }

    public Long getCurrentUserId() {
        return currentUserId;
    }

    public String getCurrentUsername() {
        return currentUsername;
    }

    public String getCurrentUserEmail() {
        return currentUserEmail;
    }

    public void logout() {
        this.currentUserId = null;
        this.currentUsername = null;
        this.currentUserEmail = null;
        logger.info("User logged out.");
    }

    /**
     * Registers a new user directly in the MySQL database.
     */
    public boolean register(String username, String email, String password) throws Exception {
        DatabaseService dbService = DatabaseService.getInstance();
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt(10));
        String sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

        try (Connection conn = dbService.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, username);
            pstmt.setString(2, email);
            pstmt.setString(3, hashedPassword);
            pstmt.executeUpdate();
            logger.info("Direct JDBC registration successful: " + username);
            return true;
        } catch (SQLException e) {
            logger.severe("Direct JDBC registration failed: " + e.getMessage());
            throw new Exception("Registration failed: " + e.getMessage(), e);
        }
    }

    /**
     * Authenticates a user directly against the MySQL database.
     */
    public boolean login(String usernameOrEmail, String password) throws Exception {
        DatabaseService dbService = DatabaseService.getInstance();
        String sql = "SELECT id, name, email, password FROM users WHERE name = ? OR email = ?";

        try (Connection conn = dbService.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, usernameOrEmail);
            pstmt.setString(2, usernameOrEmail);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    String storedHash = rs.getString("password");
                    if (BCrypt.checkpw(password, storedHash)) {
                        this.currentUserId = rs.getLong("id");
                        this.currentUsername = rs.getString("name");
                        this.currentUserEmail = rs.getString("email");
                        logger.info("Direct JDBC login successful: " + currentUsername);
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            logger.severe("Direct JDBC login failed: " + e.getMessage());
            throw new Exception("Login failed: " + e.getMessage(), e);
        }
        logger.warning("Direct JDBC login failed for user: " + usernameOrEmail);
        return false;
    }
}
