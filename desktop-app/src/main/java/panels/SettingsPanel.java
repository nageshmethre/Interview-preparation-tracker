package panels;

import services.DatabaseService;
import ui.ThemeManager;

import javax.swing.*;
import java.awt.*;

/**
 * Screen panel coordinating application preferences and MySQL JDBC server settings.
 */
public class SettingsPanel extends JPanel {
    private JTextField mysqlHostField;
    private JTextField mysqlPortField;
    private JTextField mysqlDbField;
    private JTextField mysqlUserField;
    private JPasswordField mysqlPassField;

    private JButton testConnBtn;
    private JCheckBox themeToggle;

    private final Runnable onConfigChangedCallback;

    public SettingsPanel(Runnable onConfigChangedCallback) {
        this.onConfigChangedCallback = onConfigChangedCallback;
        setLayout(new GridBagLayout());
        setBackground(Color.WHITE);
        setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(10, 10, 10, 10);

        // Section 1: Appearance
        gbc.gridx = 0; gbc.gridy = 0; gbc.gridwidth = 2;
        JLabel appTitle = new JLabel("Application Preferences");
        appTitle.setFont(new Font("Segoe UI", Font.BOLD, 18));
        add(appTitle, gbc);

        gbc.gridy = 1; gbc.gridwidth = 1;
        add(new JLabel("Dark Mode (Theme)"), gbc);
        
        themeToggle = new JCheckBox("Enable Dark Mode");
        themeToggle.setSelected(ThemeManager.isDarkMode());
        themeToggle.addActionListener(e -> ThemeManager.toggleTheme());
        gbc.gridx = 1;
        add(themeToggle, gbc);

        // Section 2: Database Mode
        gbc.gridx = 0; gbc.gridy = 2; gbc.gridwidth = 2;
        add(Box.createVerticalStrut(10), gbc);

        gbc.gridy = 3;
        JLabel dbTitle = new JLabel("Database Server Configuration");
        dbTitle.setFont(new Font("Segoe UI", Font.BOLD, 15));
        add(dbTitle, gbc);

        // MySQL Parameters Group Panel
        JPanel mysqlPanel = new JPanel(new GridLayout(5, 2, 5, 5));
        mysqlPanel.setOpaque(false);
        mysqlPanel.setBorder(BorderFactory.createTitledBorder("Direct JDBC Connection"));

        DatabaseService ds = DatabaseService.getInstance();

        mysqlPanel.add(new JLabel("Host:"));
        mysqlHostField = new JTextField(ds.getMysqlHost());
        mysqlPanel.add(mysqlHostField);

        mysqlPanel.add(new JLabel("Port:"));
        mysqlPortField = new JTextField(ds.getMysqlPort());
        mysqlPanel.add(mysqlPortField);

        mysqlPanel.add(new JLabel("Database Name:"));
        mysqlDbField = new JTextField(ds.getMysqlDatabase());
        mysqlPanel.add(mysqlDbField);

        mysqlPanel.add(new JLabel("Username:"));
        mysqlUserField = new JTextField(ds.getMysqlUser());
        mysqlPanel.add(mysqlUserField);

        mysqlPanel.add(new JLabel("Password:"));
        mysqlPassField = new JPasswordField();
        mysqlPanel.add(mysqlPassField);

        gbc.gridx = 0; gbc.gridy = 4; gbc.gridwidth = 2;
        add(mysqlPanel, gbc);

        // Buttons
        gbc.gridy = 5;
        JPanel btnPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT, 10, 0));
        btnPanel.setOpaque(false);

        testConnBtn = new JButton("Test Connection");
        testConnBtn.addActionListener(e -> testMySQLConnection());
        btnPanel.add(testConnBtn);

        JButton saveBtn = new JButton("Save & Apply Config");
        saveBtn.setFont(new Font("Segoe UI", Font.BOLD, 12));
        saveBtn.setForeground(Color.WHITE);
        saveBtn.setBackground(new Color(99, 102, 241));
        saveBtn.addActionListener(e -> saveSettings());
        btnPanel.add(saveBtn);

        add(btnPanel, gbc);
    }

    private void testMySQLConnection() {
        DatabaseService ds = DatabaseService.getInstance();
        
        String host = mysqlHostField.getText().trim();
        String port = mysqlPortField.getText().trim();
        String db = mysqlDbField.getText().trim();
        String user = mysqlUserField.getText().trim();
        String pass = new String(mysqlPassField.getPassword()).trim();

        // Backup existing config
        String origHost = ds.getMysqlHost();
        String origPort = ds.getMysqlPort();
        String origDb = ds.getMysqlDatabase();
        String origUser = ds.getMysqlUser();

        ds.configureMySQL(host, port, db, user, pass);

        if (ds.testConnection()) {
            JOptionPane.showMessageDialog(this, "JDBC Connection Successful!", "Success", JOptionPane.INFORMATION_MESSAGE);
        } else {
            JOptionPane.showMessageDialog(this, "JDBC Connection Failed. Verify parameters.", "Error", JOptionPane.ERROR_MESSAGE);
        }
        
        // Restore config
        ds.configureMySQL(origHost, origPort, origDb, origUser, "");
    }

    private void saveSettings() {
        DatabaseService ds = DatabaseService.getInstance();
        
        String host = mysqlHostField.getText().trim();
        String port = mysqlPortField.getText().trim();
        String db = mysqlDbField.getText().trim();
        String user = mysqlUserField.getText().trim();
        String pass = new String(mysqlPassField.getPassword()).trim();

        ds.configureMySQL(host, port, db, user, pass);
        onConfigChangedCallback.run();

        JOptionPane.showMessageDialog(this, "Settings saved and applied successfully!", "Success", JOptionPane.INFORMATION_MESSAGE);
    }
}
