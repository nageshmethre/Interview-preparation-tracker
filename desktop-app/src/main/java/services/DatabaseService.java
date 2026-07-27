package services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Logger;

/**
 * Singleton database service managing MySQL JDBC connections.
 * Automatically attempts credentials fallbacks (root/root then root/empty).
 */
public class DatabaseService {
    private static final Logger logger = Logger.getLogger(DatabaseService.class.getName());
    private static DatabaseService instance;

    private String mysqlHost = "localhost";
    private String mysqlPort = "3306";
    private String mysqlDatabase = "interview_tracker";
    private String mysqlUser = "root";
    private String mysqlPassword = "root"; // Try 'root' by default, auto-fallback to empty if needed

    private DatabaseService() {
        testAndConfigureCredentials();
    }

    public static synchronized DatabaseService getInstance() {
        if (instance == null) {
            instance = new DatabaseService();
        }
        return instance;
    }

    public void configureMySQL(String host, String port, String dbName, String user, String password) {
        this.mysqlHost = host;
        this.mysqlPort = port;
        this.mysqlDatabase = dbName;
        this.mysqlUser = user;
        this.mysqlPassword = password;
    }

    /**
     * Gets a Connection to the active MySQL database.
     */
    public Connection getConnection() throws SQLException {
        String url = "jdbc:mysql://" + mysqlHost + ":" + mysqlPort + "/" + mysqlDatabase + "?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
        return DriverManager.getConnection(url, mysqlUser, mysqlPassword);
    }

    /**
     * Tests connection validity.
     */
    public boolean testConnection() {
        try (Connection conn = getConnection()) {
            return conn != null && !conn.isClosed();
        } catch (SQLException e) {
            logger.warning("MySQL connection test failed: " + e.getMessage());
            return false;
        }
    }

    private void testAndConfigureCredentials() {
        // Test 1: root/root
        if (testConnection()) {
            logger.info("Connected to MySQL successfully using root/root");
            return;
        }

        // Test 2: root/empty
        String originalPass = mysqlPassword;
        mysqlPassword = "";
        if (testConnection()) {
            logger.info("Connected to MySQL successfully using root/empty");
            return;
        }

        // Test 3: root/password
        mysqlPassword = "password";
        if (testConnection()) {
            logger.info("Connected to MySQL successfully using root/password");
            return;
        }

        // Revert to default
        mysqlPassword = originalPass;
        logger.warning("Database configuration initialized but default connections failed. Manual config needed.");
    }

    public String getMysqlHost() { return mysqlHost; }
    public String getMysqlPort() { return mysqlPort; }
    public String getMysqlDatabase() { return mysqlDatabase; }
    public String getMysqlUser() { return mysqlUser; }
}
