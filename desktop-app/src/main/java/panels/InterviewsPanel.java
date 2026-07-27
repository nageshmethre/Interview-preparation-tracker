package panels;

import services.AuthService;
import services.TrackerService;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Screen panel managing Job Applications and Interview listings with add, edit, and delete options.
 */
public class InterviewsPanel extends JPanel {
    private JTable interviewsTable;
    private DefaultTableModel tableModel;
    private List<TrackerService.JobApplication> applicationsList = new ArrayList<>();

    public InterviewsPanel() {
        setLayout(new BorderLayout(15, 15));
        setBackground(Color.WHITE);
        setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        // Header Panel
        JPanel headerPanel = new JPanel(new BorderLayout());
        headerPanel.setOpaque(false);

        JLabel titleLabel = new JLabel("Placement Interview Pipeline");
        titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 22));
        titleLabel.setForeground(new Color(15, 23, 42));
        headerPanel.add(titleLabel, BorderLayout.WEST);

        // Action Toolbar Buttons
        JPanel toolbar = new JPanel(new FlowLayout(FlowLayout.RIGHT, 10, 0));
        toolbar.setOpaque(false);

        JButton btnAdd = new JButton("➕ Add Application");
        btnAdd.setFont(new Font("Segoe UI", Font.BOLD, 12));
        btnAdd.setForeground(Color.WHITE);
        btnAdd.setBackground(new Color(99, 102, 241));
        btnAdd.addActionListener(e -> showAddDialog());
        toolbar.add(btnAdd);

        JButton btnEdit = new JButton("✏ Edit");
        btnEdit.addActionListener(e -> showEditDialog());
        toolbar.add(btnEdit);

        JButton btnDelete = new JButton("🗑 Delete");
        btnDelete.addActionListener(e -> handleDelete());
        toolbar.add(btnDelete);

        headerPanel.add(toolbar, BorderLayout.EAST);
        add(headerPanel, BorderLayout.NORTH);

        // Center Table View
        String[] cols = {"ID", "Company", "Job Role", "Applied Date", "Current Status"};
        tableModel = new DefaultTableModel(cols, 0) {
            @Override
            public boolean isCellEditable(int r, int c) { return false; }
        };
        interviewsTable = new JTable(tableModel);
        interviewsTable.setRowHeight(32);
        interviewsTable.setShowGrid(true);
        interviewsTable.setGridColor(new Color(241, 245, 249));

        // Hide ID column from visual grid (maintain in model)
        interviewsTable.getColumnModel().getColumn(0).setMinWidth(0);
        interviewsTable.getColumnModel().getColumn(0).setMaxWidth(0);
        interviewsTable.getColumnModel().getColumn(0).setWidth(0);

        JScrollPane scroll = new JScrollPane(interviewsTable);
        scroll.setBorder(BorderFactory.createLineBorder(new Color(226, 232, 240), 1));
        add(scroll, BorderLayout.CENTER);
    }

    public void refreshData() {
        AuthService auth = AuthService.getInstance();
        if (!auth.isLoggedIn()) return;

        try {
            applicationsList = TrackerService.getInstance().getJobApplications(auth.getCurrentUserId());
            tableModel.setRowCount(0);

            for (TrackerService.JobApplication app : applicationsList) {
                tableModel.addRow(new Object[]{app.id, app.company, app.role, app.appliedDate, app.status});
            }
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(this, "Error fetching applications: " + e.getMessage(), "Database Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void showAddDialog() {
        JFrame rootFrame = (JFrame) SwingUtilities.getWindowAncestor(this);
        JDialog dialog = new JDialog(rootFrame, "Add Job Application", true);
        dialog.setSize(350, 320);
        dialog.setLocationRelativeTo(this);
        dialog.setLayout(new GridBagLayout());
        dialog.getContentPane().setBackground(Color.WHITE);

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(8, 15, 8, 15);
        gbc.gridwidth = GridBagConstraints.REMAINDER;

        JTextField compField = new JTextField();
        JTextField roleField = new JTextField();
        JTextField dateField = new JTextField(LocalDate.now().toString());
        JComboBox<String> statusCombo = new JComboBox<>(new String[]{"WISHLIST", "APPLIED", "INTERVIEWING", "OFFER", "REJECTED"});

        dialog.add(new JLabel("Company Name:"), gbc);
        dialog.add(compField, gbc);
        dialog.add(new JLabel("Job Role:"), gbc);
        dialog.add(roleField, gbc);
        dialog.add(new JLabel("Applied Date (YYYY-MM-DD):"), gbc);
        dialog.add(dateField, gbc);
        dialog.add(new JLabel("Application Status:"), gbc);
        dialog.add(statusCombo, gbc);

        JButton saveBtn = new JButton("Save Application");
        saveBtn.setForeground(Color.WHITE);
        saveBtn.setBackground(new Color(99, 102, 241));
        saveBtn.addActionListener(e -> {
            String company = compField.getText().trim();
            String role = roleField.getText().trim();
            String date = dateField.getText().trim();
            String status = statusCombo.getSelectedItem().toString();

            if (company.isEmpty() || role.isEmpty() || date.isEmpty()) {
                JOptionPane.showMessageDialog(dialog, "All fields are required.", "Validation", JOptionPane.WARNING_MESSAGE);
                return;
            }

            try {
                LocalDate.parse(date); // Valid date test
                TrackerService.getInstance().addJobApplication(AuthService.getInstance().getCurrentUserId(), company, role, status, date);
                dialog.dispose();
                refreshData();
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(dialog, "Error: " + ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        });
        dialog.add(Box.createVerticalStrut(10), gbc);
        dialog.add(saveBtn, gbc);
        dialog.setVisible(true);
    }

    private void showEditDialog() {
        int selectedRow = interviewsTable.getSelectedRow();
        if (selectedRow < 0) {
            JOptionPane.showMessageDialog(this, "Please select an application row to edit.", "Selection Required", JOptionPane.WARNING_MESSAGE);
            return;
        }

        int appId = (int) tableModel.getValueAt(selectedRow, 0);
        TrackerService.JobApplication targetApp = null;
        for (TrackerService.JobApplication app : applicationsList) {
            if (app.id == appId) {
                targetApp = app;
                break;
            }
        }
        if (targetApp == null) return;

        JFrame rootFrame = (JFrame) SwingUtilities.getWindowAncestor(this);
        JDialog dialog = new JDialog(rootFrame, "Edit Job Application", true);
        dialog.setSize(350, 320);
        dialog.setLocationRelativeTo(this);
        dialog.setLayout(new GridBagLayout());
        dialog.getContentPane().setBackground(Color.WHITE);

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(8, 15, 8, 15);
        gbc.gridwidth = GridBagConstraints.REMAINDER;

        JTextField compField = new JTextField(targetApp.company);
        JTextField roleField = new JTextField(targetApp.role);
        JTextField dateField = new JTextField(targetApp.appliedDate);
        JComboBox<String> statusCombo = new JComboBox<>(new String[]{"WISHLIST", "APPLIED", "INTERVIEWING", "OFFER", "REJECTED"});
        statusCombo.setSelectedItem(targetApp.status.toUpperCase());

        dialog.add(new JLabel("Company Name:"), gbc);
        dialog.add(compField, gbc);
        dialog.add(new JLabel("Job Role:"), gbc);
        dialog.add(roleField, gbc);
        dialog.add(new JLabel("Applied Date (YYYY-MM-DD):"), gbc);
        dialog.add(dateField, gbc);
        dialog.add(new JLabel("Application Status:"), gbc);
        dialog.add(statusCombo, gbc);

        final int finalId = appId;
        JButton saveBtn = new JButton("Update Application");
        saveBtn.setForeground(Color.WHITE);
        saveBtn.setBackground(new Color(99, 102, 241));
        saveBtn.addActionListener(e -> {
            String company = compField.getText().trim();
            String role = roleField.getText().trim();
            String date = dateField.getText().trim();
            String status = statusCombo.getSelectedItem().toString();

            if (company.isEmpty() || role.isEmpty() || date.isEmpty()) {
                JOptionPane.showMessageDialog(dialog, "All fields are required.", "Validation", JOptionPane.WARNING_MESSAGE);
                return;
            }

            try {
                LocalDate.parse(date);
                TrackerService.getInstance().updateJobApplication(finalId, company, role, status, date);
                dialog.dispose();
                refreshData();
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(dialog, "Error: " + ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        });
        dialog.add(Box.createVerticalStrut(10), gbc);
        dialog.add(saveBtn, gbc);
        dialog.setVisible(true);
    }

    private void handleDelete() {
        int selectedRow = interviewsTable.getSelectedRow();
        if (selectedRow < 0) {
            JOptionPane.showMessageDialog(this, "Please select an application row to delete.", "Selection Required", JOptionPane.WARNING_MESSAGE);
            return;
        }

        int appId = (int) tableModel.getValueAt(selectedRow, 0);
        String company = (String) tableModel.getValueAt(selectedRow, 1);

        int confirm = JOptionPane.showConfirmDialog(this, 
                "Are you sure you want to delete the application for " + company + "?", 
                "Confirm Delete", JOptionPane.YES_NO_OPTION);
        
        if (confirm == JOptionPane.YES_OPTION) {
            try {
                TrackerService.getInstance().deleteJobApplication(appId);
                refreshData();
            } catch (SQLException e) {
                JOptionPane.showMessageDialog(this, "Error deleting application: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        }
    }
}
