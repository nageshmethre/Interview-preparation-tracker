package panels;

import services.AuthService;

import javax.swing.*;
import java.awt.*;

/**
 * Screen panel coordinating authentication (Login & Sign Up forms).
 */
public class LoginPanel extends JPanel {
    private CardLayout cardLayout;
    private JPanel cardsContainer;

    // Login Fields
    private JTextField loginUserField;
    private JPasswordField loginPassField;

    // Register Fields
    private JTextField regUserField;
    private JTextField regEmailField;
    private JPasswordField regPassField;
    private JPasswordField regConfirmPassField;

    private final Runnable onSuccessCallback;

    public LoginPanel(Runnable onSuccessCallback) {
        this.onSuccessCallback = onSuccessCallback;
        setLayout(new GridBagLayout());
        setBackground(new Color(241, 245, 249)); // Slate 100 background

        cardLayout = new CardLayout();
        cardsContainer = new JPanel(cardLayout);
        cardsContainer.setOpaque(false);

        // Build cards
        cardsContainer.add(createLoginCard(), "LOGIN");
        cardsContainer.add(createRegisterCard(), "REGISTER");

        // Center card container
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.weightx = 1.0;
        gbc.weighty = 1.0;
        gbc.anchor = GridBagConstraints.CENTER;
        add(cardsContainer, gbc);
    }

    private JPanel createLoginCard() {
        JPanel panel = new JPanel(new GridBagLayout());
        panel.setPreferredSize(new Dimension(380, 420));
        panel.setBackground(Color.WHITE);
        panel.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(226, 232, 240), 1),
                BorderFactory.createEmptyBorder(20, 25, 20, 25)
        ));

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.gridwidth = GridBagConstraints.REMAINDER;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(10, 0, 10, 0);

        // Header Title
        JLabel titleLabel = new JLabel("Welcome Back", JLabel.CENTER);
        titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 26));
        titleLabel.setForeground(new Color(99, 102, 241));
        panel.add(titleLabel, gbc);

        JLabel subtitle = new JLabel("Login to start tracking your placement prep", JLabel.CENTER);
        subtitle.setFont(new Font("Segoe UI", Font.PLAIN, 12));
        subtitle.setForeground(Color.GRAY);
        panel.add(subtitle, gbc);

        panel.add(Box.createVerticalStrut(20), gbc);

        // Username
        panel.add(new JLabel("Username or Email"), gbc);
        loginUserField = new JTextField();
        loginUserField.setPreferredSize(new Dimension(0, 35));
        panel.add(loginUserField, gbc);

        // Password
        panel.add(new JLabel("Password"), gbc);
        loginPassField = new JPasswordField();
        loginPassField.setPreferredSize(new Dimension(0, 35));
        panel.add(loginPassField, gbc);

        panel.add(Box.createVerticalStrut(10), gbc);

        // Login Button
        JButton loginBtn = new JButton("Login");
        loginBtn.setFont(new Font("Segoe UI", Font.BOLD, 14));
        loginBtn.setForeground(Color.WHITE);
        loginBtn.setBackground(new Color(99, 102, 241));
        loginBtn.setFocusPainted(false);
        loginBtn.setPreferredSize(new Dimension(0, 40));
        loginBtn.addActionListener(e -> handleLogin());
        panel.add(loginBtn, gbc);

        // Toggle Links
        JPanel linkPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 5, 5));
        linkPanel.setOpaque(false);
        JLabel noAccountLabel = new JLabel("Don't have an account?");
        noAccountLabel.setFont(new Font("Segoe UI", Font.PLAIN, 12));
        JButton registerLink = new JButton("Sign Up");
        registerLink.setFont(new Font("Segoe UI", Font.BOLD, 12));
        registerLink.setForeground(new Color(99, 102, 241));
        registerLink.setBorderPainted(false);
        registerLink.setContentAreaFilled(false);
        registerLink.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        registerLink.addActionListener(e -> cardLayout.show(cardsContainer, "REGISTER"));
        
        linkPanel.add(noAccountLabel);
        linkPanel.add(registerLink);
        panel.add(linkPanel, gbc);

        return panel;
    }

    private JPanel createRegisterCard() {
        JPanel panel = new JPanel(new GridBagLayout());
        panel.setPreferredSize(new Dimension(380, 500));
        panel.setBackground(Color.WHITE);
        panel.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(226, 232, 240), 1),
                BorderFactory.createEmptyBorder(20, 25, 20, 25)
        ));

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.gridwidth = GridBagConstraints.REMAINDER;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(8, 0, 8, 0);

        // Header Title
        JLabel titleLabel = new JLabel("Create Account", JLabel.CENTER);
        titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 26));
        titleLabel.setForeground(new Color(99, 102, 241));
        panel.add(titleLabel, gbc);

        panel.add(Box.createVerticalStrut(10), gbc);

        // Username
        panel.add(new JLabel("Username"), gbc);
        regUserField = new JTextField();
        regUserField.setPreferredSize(new Dimension(0, 32));
        panel.add(regUserField, gbc);

        // Email
        panel.add(new JLabel("Email Address"), gbc);
        regEmailField = new JTextField();
        regEmailField.setPreferredSize(new Dimension(0, 32));
        panel.add(regEmailField, gbc);

        // Password
        panel.add(new JLabel("Password"), gbc);
        regPassField = new JPasswordField();
        regPassField.setPreferredSize(new Dimension(0, 32));
        panel.add(regPassField, gbc);

        // Confirm Password
        panel.add(new JLabel("Confirm Password"), gbc);
        regConfirmPassField = new JPasswordField();
        regConfirmPassField.setPreferredSize(new Dimension(0, 32));
        panel.add(regConfirmPassField, gbc);

        panel.add(Box.createVerticalStrut(10), gbc);

        // Sign Up Button
        JButton signUpBtn = new JButton("Sign Up");
        signUpBtn.setFont(new Font("Segoe UI", Font.BOLD, 14));
        signUpBtn.setForeground(Color.WHITE);
        signUpBtn.setBackground(new Color(99, 102, 241));
        signUpBtn.setFocusPainted(false);
        signUpBtn.setPreferredSize(new Dimension(0, 40));
        signUpBtn.addActionListener(e -> handleRegister());
        panel.add(signUpBtn, gbc);

        // Toggle Links
        JPanel linkPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 5, 5));
        linkPanel.setOpaque(false);
        JLabel hasAccountLabel = new JLabel("Already have an account?");
        hasAccountLabel.setFont(new Font("Segoe UI", Font.PLAIN, 12));
        JButton loginLink = new JButton("Login");
        loginLink.setFont(new Font("Segoe UI", Font.BOLD, 12));
        loginLink.setForeground(new Color(99, 102, 241));
        loginLink.setBorderPainted(false);
        loginLink.setContentAreaFilled(false);
        loginLink.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        loginLink.addActionListener(e -> cardLayout.show(cardsContainer, "LOGIN"));
        
        linkPanel.add(hasAccountLabel);
        linkPanel.add(loginLink);
        panel.add(linkPanel, gbc);

        return panel;
    }

    private void handleLogin() {
        String username = loginUserField.getText().trim();
        String password = new String(loginPassField.getPassword()).trim();

        if (username.isEmpty() || password.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Username and Password are required.", "Validation Error", JOptionPane.WARNING_MESSAGE);
            return;
        }

        try {
            boolean success = AuthService.getInstance().login(username, password);
            if (success) {
                onSuccessCallback.run();
                // Clear fields
                loginUserField.setText("");
                loginPassField.setText("");
            } else {
                JOptionPane.showMessageDialog(this, "Invalid credentials.", "Login Failed", JOptionPane.ERROR_MESSAGE);
            }
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(this, "Login error: " + ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void handleRegister() {
        String username = regUserField.getText().trim();
        String email = regEmailField.getText().trim();
        String password = new String(regPassField.getPassword()).trim();
        String confirm = new String(regConfirmPassField.getPassword()).trim();

        if (username.isEmpty() || email.isEmpty() || password.isEmpty()) {
            JOptionPane.showMessageDialog(this, "All fields are required.", "Validation Error", JOptionPane.WARNING_MESSAGE);
            return;
        }

        if (password.length() < 6) {
            JOptionPane.showMessageDialog(this, "Password must be at least 6 characters.", "Validation Error", JOptionPane.WARNING_MESSAGE);
            return;
        }

        if (!password.equals(confirm)) {
            JOptionPane.showMessageDialog(this, "Passwords do not match.", "Validation Error", JOptionPane.WARNING_MESSAGE);
            return;
        }

        try {
            boolean success = AuthService.getInstance().register(username, email, password);
            if (success) {
                JOptionPane.showMessageDialog(this, "Registration successful! You can now log in.", "Success", JOptionPane.INFORMATION_MESSAGE);
                cardLayout.show(cardsContainer, "LOGIN");
                // Clear fields
                regUserField.setText("");
                regEmailField.setText("");
                regPassField.setText("");
                regConfirmPassField.setText("");
            }
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(this, "Registration error: " + ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
}
