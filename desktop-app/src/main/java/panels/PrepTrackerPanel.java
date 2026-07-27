package panels;

import services.AuthService;
import services.TrackerService;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

/**
 * Screen panel managing active study plan roadmaps with direct database persistence.
 */
public class PrepTrackerPanel extends JPanel {
    private JTable roadmapTable;
    private DefaultTableModel tableModel;

    private JTextField titleField;
    private JTextField targetCompField;
    private JTextField startField;
    private JTextField endField;

    public PrepTrackerPanel() {
        setLayout(new BorderLayout(15, 15));
        setBackground(Color.WHITE);
        setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        // Header Title
        JLabel titleLabel = new JLabel("Personalized Preparation Roadmaps");
        titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 22));
        titleLabel.setForeground(new Color(15, 23, 42));
        add(titleLabel, BorderLayout.NORTH);

        // Add roadmap form panel (Top/North area under title)
        JPanel formContainer = new JPanel(new BorderLayout(0, 10));
        formContainer.setOpaque(false);

        JPanel inputGrid = new JPanel(new GridLayout(2, 4, 10, 5));
        inputGrid.setOpaque(false);

        inputGrid.add(new JLabel("Roadmap Title:"));
        inputGrid.add(new JLabel("Target Company:"));
        inputGrid.add(new JLabel("Start Date (YYYY-MM-DD):"));
        inputGrid.add(new JLabel("End Date (YYYY-MM-DD):"));

        titleField = new JTextField();
        targetCompField = new JTextField();
        startField = new JTextField(LocalDate.now().toString());
        endField = new JTextField(LocalDate.now().plusWeeks(4).toString());

        inputGrid.add(titleField);
        inputGrid.add(targetCompField);
        inputGrid.add(startField);
        inputGrid.add(endField);

        JPanel btnBar = new JPanel(new FlowLayout(FlowLayout.RIGHT, 10, 0));
        btnBar.setOpaque(false);

        JButton btnAdd = new JButton("➕ Create Roadmap");
        btnAdd.setFont(new Font("Segoe UI", Font.BOLD, 12));
        btnAdd.setForeground(Color.WHITE);
        btnAdd.setBackground(new Color(16, 185, 129)); // Emerald Green
        btnAdd.addActionListener(e -> handleAddRoadmap());
        btnBar.add(btnAdd);

        JButton btnDelete = new JButton("🗑 Delete Selected");
        btnDelete.addActionListener(e -> handleDeleteRoadmap());
        btnBar.add(btnDelete);

        formContainer.add(inputGrid, BorderLayout.CENTER);
        formContainer.add(btnBar, BorderLayout.SOUTH);

        // Table Panel (Center)
        String[] cols = {"ID", "Roadmap Title", "Target Company", "Start Date", "End Date", "Status"};
        tableModel = new DefaultTableModel(cols, 0) {
            @Override
            public boolean isCellEditable(int r, int c) { return false; }
        };
        roadmapTable = new JTable(tableModel);
        roadmapTable.setRowHeight(30);
        roadmapTable.setShowGrid(true);
        roadmapTable.setGridColor(new Color(241, 245, 249));

        // Hide ID Column
        roadmapTable.getColumnModel().getColumn(0).setMinWidth(0);
        roadmapTable.getColumnModel().getColumn(0).setMaxWidth(0);
        roadmapTable.getColumnModel().getColumn(0).setWidth(0);

        JScrollPane scroll = new JScrollPane(roadmapTable);
        scroll.setBorder(BorderFactory.createLineBorder(new Color(226, 232, 240), 1));

        JPanel mainLayout = new JPanel(new BorderLayout(0, 15));
        mainLayout.setOpaque(false);
        mainLayout.add(formContainer, BorderLayout.NORTH);
        mainLayout.add(scroll, BorderLayout.CENTER);

        add(mainLayout, BorderLayout.CENTER);
    }

    public void refreshData() {
        AuthService auth = AuthService.getInstance();
        if (!auth.isLoggedIn()) return;

        try {
            List<TrackerService.StudyPlan> plans = TrackerService.getInstance().getStudyPlans(auth.getCurrentUserId());
            tableModel.setRowCount(0);
            for (TrackerService.StudyPlan plan : plans) {
                tableModel.addRow(new Object[]{plan.id, plan.title, plan.targetCompany, plan.startDate, plan.endDate, plan.status});
            }
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(this, "Error fetching roadmaps: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void handleAddRoadmap() {
        String title = titleField.getText().trim();
        String company = targetCompField.getText().trim();
        String start = startField.getText().trim();
        String end = endField.getText().trim();

        if (title.isEmpty() || start.isEmpty() || end.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Title, Start Date, and End Date are required.", "Validation", JOptionPane.WARNING_MESSAGE);
            return;
        }

        try {
            LocalDate.parse(start);
            LocalDate.parse(end);
            
            TrackerService.getInstance().addStudyPlan(
                    AuthService.getInstance().getCurrentUserId(),
                    title,
                    company.isEmpty() ? null : company,
                    start,
                    end,
                    "ACTIVE"
            );

            // Clear inputs
            titleField.setText("");
            targetCompField.setText("");
            startField.setText(LocalDate.now().toString());
            endField.setText(LocalDate.now().plusWeeks(4).toString());

            refreshData();
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(this, "Error creating roadmap: " + ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void handleDeleteRoadmap() {
        int selectedRow = roadmapTable.getSelectedRow();
        if (selectedRow < 0) {
            JOptionPane.showMessageDialog(this, "Please select a roadmap row to delete.", "Selection Required", JOptionPane.WARNING_MESSAGE);
            return;
        }

        int planId = (int) tableModel.getValueAt(selectedRow, 0);
        String title = (String) tableModel.getValueAt(selectedRow, 1);

        int confirm = JOptionPane.showConfirmDialog(this, 
                "Are you sure you want to delete study plan: " + title + "?", 
                "Confirm Delete", JOptionPane.YES_NO_OPTION);

        if (confirm == JOptionPane.YES_OPTION) {
            try {
                TrackerService.getInstance().deleteStudyPlan(planId);
                refreshData();
            } catch (SQLException e) {
                JOptionPane.showMessageDialog(this, "Error deleting study plan: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        }
    }
}
