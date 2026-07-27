import services.DatabaseService;
import ui.ThemeManager;
import ui.MainFrame;

import javax.swing.*;
import java.awt.*;
import java.util.logging.Logger;

/**
 * Main application window launcher. Runs a Splash progress loading screen,
 * initializes database connection drivers, and starts MainFrame.
 */
public class Main {
    private static final Logger logger = Logger.getLogger(Main.class.getName());

    public static void main(String[] args) {
        logger.info("Initializing PrepSpace Desktop Launcher...");

        // Initialize look and feel
        ThemeManager.init();

        // Splash screen frame
        SplashFrame splash = new SplashFrame();
        splash.setVisible(true);

        try {
            splash.setProgress(20, "Loading UI frameworks...");
            Thread.sleep(300);

            splash.setProgress(55, "Connecting to MySQL Database via JDBC...");
            DatabaseService.getInstance(); // Triggers lazy database connection & fallback logic
            Thread.sleep(400);

            splash.setProgress(85, "Building dashboard layouts...");
            Thread.sleep(300);

            splash.setProgress(100, "Done");
            Thread.sleep(100);
        } catch (InterruptedException e) {
            logger.severe("Startup loading was interrupted: " + e.getMessage());
        }

        // Close splash screen and launch main frame window
        SwingUtilities.invokeLater(() -> {
            splash.dispose();
            MainFrame mainFrame = new MainFrame();
            mainFrame.setVisible(true);
            logger.info("Main application GUI window launched successfully.");
        });
    }

    // Centered loading Splash window
    private static class SplashFrame extends JWindow {
        private final JProgressBar progressBar;
        private final JLabel statusLabel;

        public SplashFrame() {
            setSize(450, 280);
            setLocationRelativeTo(null); // Center on screen
            
            JPanel content = new JPanel(new BorderLayout());
            content.setBackground(new Color(30, 41, 59)); // Dark slate
            content.setBorder(BorderFactory.createLineBorder(new Color(99, 102, 241), 2)); // Indigo border

            // Splash header
            JPanel headerPanel = new JPanel(new GridBagLayout());
            headerPanel.setOpaque(false);
            GridBagConstraints gbc = new GridBagConstraints();
            gbc.gridwidth = GridBagConstraints.REMAINDER;
            gbc.insets = new Insets(10, 10, 10, 10);

            JLabel titleLabel = new JLabel("PrepSpace", JLabel.CENTER);
            titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 28));
            titleLabel.setForeground(new Color(248, 250, 252)); // Slate 50
            headerPanel.add(titleLabel, gbc);

            JLabel subtitleLabel = new JLabel("Interview Prep & Placement Tracker", JLabel.CENTER);
            subtitleLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            subtitleLabel.setForeground(new Color(148, 163, 184)); // Slate 400
            headerPanel.add(subtitleLabel, gbc);

            content.add(headerPanel, BorderLayout.CENTER);

            // Progress bar and labels panel
            JPanel bottomPanel = new JPanel(new BorderLayout(5, 5));
            bottomPanel.setOpaque(false);
            bottomPanel.setBorder(BorderFactory.createEmptyBorder(15, 25, 25, 25));

            statusLabel = new JLabel("Loading placement services...", JLabel.LEFT);
            statusLabel.setFont(new Font("Segoe UI", Font.PLAIN, 12));
            statusLabel.setForeground(new Color(148, 163, 184));
            bottomPanel.add(statusLabel, BorderLayout.NORTH);

            progressBar = new JProgressBar(0, 100);
            progressBar.setValue(0);
            progressBar.setStringPainted(true);
            progressBar.setForeground(new Color(99, 102, 241)); // Indigo 500
            progressBar.setBackground(new Color(15, 23, 42));
            progressBar.setFont(new Font("Segoe UI", Font.BOLD, 11));
            progressBar.setBorderPainted(false);
            bottomPanel.add(progressBar, BorderLayout.SOUTH);

            content.add(bottomPanel, BorderLayout.SOUTH);
            setContentPane(content);
        }

        public void setProgress(int value, String message) {
            progressBar.setValue(value);
            statusLabel.setText(message);
        }
    }
}
