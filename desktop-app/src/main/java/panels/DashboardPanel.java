package panels;

import services.AuthService;
import services.TrackerService;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Logger;

/**
 * Screen panel displaying summary statistics and an upcoming interviews overview.
 */
public class DashboardPanel extends JPanel {
    private static final Logger logger = Logger.getLogger(DashboardPanel.class.getName());
    private JLabel welcomeLabel;
    private JLabel totalAppsLabel;
    private JLabel solvedQuestionsLabel;
    private JLabel totalRoadmapsLabel;

    private JTable upcomingTable;
    private DefaultTableModel tableModel;
    private final Runnable navigateToInterviewsCallback;

    public DashboardPanel(Runnable navigateToInterviewsCallback) {
        this.navigateToInterviewsCallback = navigateToInterviewsCallback;
        setLayout(new BorderLayout(15, 15));
        setBackground(Color.WHITE);
        setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        // 1. Header welcome banner
        JPanel headerPanel = new JPanel(new BorderLayout());
        headerPanel.setOpaque(false);

        welcomeLabel = new JLabel("Welcome, Candidate");
        welcomeLabel.setFont(new Font("Segoe UI", Font.BOLD, 24));
        welcomeLabel.setForeground(new Color(15, 23, 42));
        headerPanel.add(welcomeLabel, BorderLayout.WEST);

        JLabel bannerSub = new JLabel("Your preparation overview metrics");
        bannerSub.setFont(new Font("Segoe UI", Font.PLAIN, 12));
        bannerSub.setForeground(Color.GRAY);
        headerPanel.add(bannerSub, BorderLayout.SOUTH);

        add(headerPanel, BorderLayout.NORTH);

        // 2. Metrics grid cards
        JPanel metricsPanel = new JPanel(new GridLayout(1, 3, 15, 0));
        metricsPanel.setOpaque(false);
        metricsPanel.setPreferredSize(new Dimension(0, 100));

        metricsPanel.add(createMetricCard("💼 Job Applications", totalAppsLabel = new JLabel("0"), new Color(99, 102, 241)));
        metricsPanel.add(createMetricCard("🎯 LeetCode Solved", solvedQuestionsLabel = new JLabel("0 / 257"), new Color(14, 165, 233)));
        metricsPanel.add(createMetricCard("🗓 Active Roadmaps", totalRoadmapsLabel = new JLabel("0"), new Color(16, 185, 129)));

        // 3. Center Section (Upcoming JTable list & Quick Actions)
        JPanel centerPanel = new JPanel(new BorderLayout(0, 15));
        centerPanel.setOpaque(false);
        centerPanel.add(metricsPanel, BorderLayout.NORTH);

        // Upcoming interviews table panel
        JPanel tablePanel = new JPanel(new BorderLayout(0, 10));
        tablePanel.setOpaque(false);

        JLabel tableTitle = new JLabel("Recent Interview Pipeline Status");
        tableTitle.setFont(new Font("Segoe UI", Font.BOLD, 15));
        tableTitle.setForeground(new Color(15, 23, 42));
        tablePanel.add(tableTitle, BorderLayout.NORTH);

        String[] cols = {"Company", "Role", "Applied Date", "Current Status"};
        tableModel = new DefaultTableModel(cols, 0) {
            @Override
            public boolean isCellEditable(int r, int c) { return false; }
        };
        upcomingTable = new JTable(tableModel);
        upcomingTable.setRowHeight(30);
        upcomingTable.setShowGrid(true);
        upcomingTable.setGridColor(new Color(241, 245, 249));

        JScrollPane scroll = new JScrollPane(upcomingTable);
        scroll.setBorder(BorderFactory.createLineBorder(new Color(226, 232, 240), 1));
        tablePanel.add(scroll, BorderLayout.CENTER);

        centerPanel.add(tablePanel, BorderLayout.CENTER);

        // Quick action sidebar
        JPanel rightActionsPanel = new JPanel();
        rightActionsPanel.setLayout(new BoxLayout(rightActionsPanel, BoxLayout.Y_AXIS));
        rightActionsPanel.setPreferredSize(new Dimension(200, 0));
        rightActionsPanel.setOpaque(false);
        rightActionsPanel.setBorder(BorderFactory.createTitledBorder("Quick Tasks"));

        JButton btnAddApp = new JButton("➕ Manage Applications");
        btnAddApp.setFont(new Font("Segoe UI", Font.BOLD, 12));
        btnAddApp.setForeground(Color.WHITE);
        btnAddApp.setBackground(new Color(99, 102, 241));
        btnAddApp.setFocusPainted(false);
        btnAddApp.setMaximumSize(new Dimension(180, 40));
        btnAddApp.setAlignmentX(Component.CENTER_ALIGNMENT);
        btnAddApp.addActionListener(e -> navigateToInterviewsCallback.run());

        rightActionsPanel.add(Box.createVerticalStrut(15));
        rightActionsPanel.add(btnAddApp);

        add(centerPanel, BorderLayout.CENTER);
        add(rightActionsPanel, BorderLayout.EAST);
    }

    private JPanel createMetricCard(String title, JLabel valueLabel, Color accentColor) {
        JPanel card = new JPanel(new BorderLayout(5, 5));
        card.setBackground(Color.WHITE);
        card.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createMatteBorder(0, 4, 0, 0, accentColor),
                BorderFactory.createCompoundBorder(
                        BorderFactory.createLineBorder(new Color(226, 232, 240), 1),
                        BorderFactory.createEmptyBorder(15, 15, 15, 15)
                )
        ));

        JLabel titleLabel = new JLabel(title);
        titleLabel.setFont(new Font("Segoe UI", Font.PLAIN, 12));
        titleLabel.setForeground(Color.GRAY);
        card.add(titleLabel, BorderLayout.NORTH);

        valueLabel.setFont(new Font("Segoe UI", Font.BOLD, 22));
        valueLabel.setForeground(new Color(15, 23, 42));
        card.add(valueLabel, BorderLayout.CENTER);

        return card;
    }

    public void refreshData() {
        AuthService auth = AuthService.getInstance();
        if (!auth.isLoggedIn()) return;

        welcomeLabel.setText("Welcome, " + auth.getCurrentUsername());

        try {
            TrackerService ts = TrackerService.getInstance();
            List<TrackerService.JobApplication> apps = ts.getJobApplications(auth.getCurrentUserId());
            List<TrackerService.StudyPlan> plans = ts.getStudyPlans(auth.getCurrentUserId());
            
            // Set counts
            totalAppsLabel.setText(String.valueOf(apps.size()));
            totalRoadmapsLabel.setText(String.valueOf(plans.size()));
            
            int solved = ts.getSolvedCount(auth.getCurrentUserId());
            int totalQuestions = ts.getQuestionsCount();
            if (totalQuestions == 0) totalQuestions = 257; // Seed fallback
            solvedQuestionsLabel.setText(solved + " / " + totalQuestions);

            // Populate table with top 5 recent applications
            tableModel.setRowCount(0);
            int count = 0;
            for (TrackerService.JobApplication app : apps) {
                if (count >= 5) break;
                tableModel.addRow(new Object[]{app.company, app.role, app.appliedDate, app.status});
                count++;
            }

        } catch (SQLException e) {
            logger.warning("Failed to refresh dashboard panel metrics: " + e.getMessage());
        }
    }
}
