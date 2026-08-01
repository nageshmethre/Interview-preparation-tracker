package ui;

import panels.*;
import services.AuthService;
import services.DatabaseService;

import javax.swing.*;
import java.awt.*;
import java.util.logging.Logger;

/**
 * Main application window coordinating layout, sidebar transitions, and authentication flow.
 */
public class MainFrame extends JFrame {
    private static final Logger logger = Logger.getLogger(MainFrame.class.getName());

    private CardLayout cardLayout;
    private JPanel mainContentCardPanel;
    private JPanel sidebarPanel;
    private JLabel statusLabel;
    
    // Navigation Sidebar Buttons
    private JButton btnDashboard;
    private JButton btnInterviews;
    private JButton btnPrepTracker;
    private JButton btnSettings;
    private JButton btnLogout;

    // View Panels
    private LoginPanel loginPanel;
    private DashboardPanel dashboardPanel;
    private InterviewsPanel interviewsPanel;
    private PrepTrackerPanel prepTrackerPanel;
    private SettingsPanel settingsPanel;

    private String currentCard = "LOGIN";

    public MainFrame() {
        setTitle("PrepSpace — Interview Preparation & Placement Tracker");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1024, 720);
        setMinimumSize(new Dimension(850, 600));
        setLocationRelativeTo(null); // Center on screen

        // Setup CardLayout for main workspace panels
        cardLayout = new CardLayout();
        mainContentCardPanel = new JPanel(cardLayout);

        // Initialize panels
        loginPanel = new LoginPanel(this::onLoginSuccess);
        dashboardPanel = new DashboardPanel(this::switchToInterviews);
        interviewsPanel = new InterviewsPanel();
        prepTrackerPanel = new PrepTrackerPanel();
        settingsPanel = new SettingsPanel(this::updateStatusText);

        // Mount cards
        mainContentCardPanel.add(loginPanel, "LOGIN");
        mainContentCardPanel.add(dashboardPanel, "DASHBOARD");
        mainContentCardPanel.add(interviewsPanel, "INTERVIEWS");
        mainContentCardPanel.add(prepTrackerPanel, "PREP_TRACKER");
        mainContentCardPanel.add(settingsPanel, "SETTINGS");

        // Build navigation sidebar
        buildSidebar();

        // Footer status bar
        JPanel statusBar = new JPanel(new BorderLayout());
        statusBar.setBorder(BorderFactory.createEmptyBorder(5, 10, 5, 10));
        statusBar.setBackground(new Color(241, 245, 249));
        
        statusLabel = new JLabel("Database status: Connected to localhost:3306");
        statusLabel.setFont(new Font("Segoe UI", Font.PLAIN, 11));
        statusLabel.setForeground(Color.GRAY);
        statusBar.add(statusLabel, BorderLayout.WEST);

        JLabel authorLabel = new JLabel("Author: nagesh methre  |  College Project");
        authorLabel.setFont(new Font("Segoe UI", Font.PLAIN, 11));
        authorLabel.setForeground(Color.GRAY);
        statusBar.add(authorLabel, BorderLayout.EAST);

        // Layout Assembly
        getContentPane().setLayout(new BorderLayout());
        getContentPane().add(sidebarPanel, BorderLayout.WEST);
        getContentPane().add(mainContentCardPanel, BorderLayout.CENTER);
        getContentPane().add(statusBar, BorderLayout.SOUTH);

        // Initial View state
        showCard("LOGIN");
        updateStatusText();
    }

    private void buildSidebar() {
        sidebarPanel = new JPanel();
        sidebarPanel.setPreferredSize(new Dimension(200, 0));
        sidebarPanel.setBackground(new Color(15, 23, 42)); // Dark Slate
        sidebarPanel.setLayout(new BoxLayout(sidebarPanel, BoxLayout.Y_AXIS));
        sidebarPanel.setBorder(BorderFactory.createEmptyBorder(20, 10, 20, 10));

        // Brand Title
        JLabel brandLabel = new JLabel("PrepSpace");
        brandLabel.setFont(new Font("Segoe UI", Font.BOLD, 22));
        brandLabel.setForeground(new Color(99, 102, 241)); // Indigo 500
        brandLabel.setAlignmentX(Component.CENTER_ALIGNMENT);
        sidebarPanel.add(brandLabel);

        JLabel versionLabel = new JLabel("Swing Client v1.0");
        versionLabel.setFont(new Font("Segoe UI", Font.PLAIN, 11));
        versionLabel.setForeground(Color.GRAY);
        versionLabel.setAlignmentX(Component.CENTER_ALIGNMENT);
        sidebarPanel.add(versionLabel);

        sidebarPanel.add(Box.createVerticalStrut(30));

        // Menu buttons
        btnDashboard = createMenuButton("📊 Dashboard", "DASHBOARD");
        btnInterviews = createMenuButton("💼 Interviews", "INTERVIEWS");
        btnPrepTracker = createMenuButton("📚 Prep Tracker", "PREP_TRACKER");
        btnSettings = createMenuButton("⚙ Settings", "SETTINGS");
        btnLogout = createMenuButton("🚪 Logout", "LOGOUT");

        sidebarPanel.add(btnDashboard);
        sidebarPanel.add(Box.createVerticalStrut(10));
        sidebarPanel.add(btnInterviews);
        sidebarPanel.add(Box.createVerticalStrut(10));
        sidebarPanel.add(btnPrepTracker);
        sidebarPanel.add(Box.createVerticalStrut(10));
        sidebarPanel.add(btnSettings);
        sidebarPanel.add(Box.createVerticalGlue());
        sidebarPanel.add(btnLogout);
    }

    private JButton createMenuButton(String text, final String cardName) {
        JButton btn = new JButton(text);
        btn.setFont(new Font("Segoe UI", Font.BOLD, 13));
        btn.setForeground(new Color(226, 232, 240));
        btn.setBackground(new Color(30, 41, 59));
        btn.setFocusPainted(false);
        btn.setBorderPainted(false);
        btn.setOpaque(true);
        btn.setMaximumSize(new Dimension(180, 40));
        btn.setPreferredSize(new Dimension(180, 40));
        btn.setAlignmentX(Component.CENTER_ALIGNMENT);
        
        btn.addActionListener(e -> {
            if ("LOGOUT".equals(cardName)) {
                onLogout();
            } else {
                showCard(cardName);
            }
        });
        return btn;
    }

    public void showCard(String cardName) {
        currentCard = cardName;
        cardLayout.show(mainContentCardPanel, cardName);

        // Sidebar visibility based on Login card
        boolean isLogged = !"LOGIN".equals(cardName);
        sidebarPanel.setVisible(isLogged);

        // Refresh panel data when navigating
        if ("DASHBOARD".equals(cardName)) {
            dashboardPanel.refreshData();
        } else if ("INTERVIEWS".equals(cardName)) {
            interviewsPanel.refreshData();
        } else if ("PREP_TRACKER".equals(cardName)) {
            prepTrackerPanel.refreshData();
        }
        revalidate();
        repaint();
    }

    private void onLoginSuccess() {
        showCard("DASHBOARD");
    }

    private void onLogout() {
        AuthService.getInstance().logout();
        showCard("LOGIN");
    }

    private void switchToInterviews() {
        showCard("INTERVIEWS");
    }

    private void updateStatusText() {
        DatabaseService ds = DatabaseService.getInstance();
        statusLabel.setText("Database host: " + ds.getMysqlHost() + ":" + ds.getMysqlPort() + "  |  DB: " + ds.getMysqlDatabase());
    }
}
