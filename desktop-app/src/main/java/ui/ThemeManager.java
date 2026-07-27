package ui;

import com.formdev.flatlaf.FlatDarkLaf;
import com.formdev.flatlaf.FlatLightLaf;

import javax.swing.*;
import java.awt.*;
import java.util.logging.Logger;

/**
 * Manager class for handling application styling themes (Light/Dark Mode).
 * Uses FormDev FlatLaf themes.
 */
public class ThemeManager {
    private static final Logger logger = Logger.getLogger(ThemeManager.class.getName());
    private static boolean darkMode = false;

    /**
     * Initializes the theme to the default FlatLaf light skin.
     */
    public static void init() {
        try {
            UIManager.setLookAndFeel(new FlatLightLaf());
            logger.info("FlatLaf Light theme initialized.");
        } catch (Exception ex) {
            logger.severe("Failed to initialize FlatLaf Light Look & Feel: " + ex.getMessage());
        }
    }

    public static boolean isDarkMode() {
        return darkMode;
    }

    /**
     * Toggles the application styling dynamically between Light and Dark mode.
     */
    public static void toggleTheme() {
        darkMode = !darkMode;
        try {
            if (darkMode) {
                UIManager.setLookAndFeel(new FlatDarkLaf());
                logger.info("Switched to FlatLaf Dark theme.");
            } else {
                UIManager.setLookAndFeel(new FlatLightLaf());
                logger.info("Switched to FlatLaf Light theme.");
            }
            
            // Recalculate UI for all open windows
            for (Window window : Window.getWindows()) {
                SwingUtilities.updateComponentTreeUI(window);
            }
        } catch (Exception ex) {
            logger.severe("Failed to toggle look and feel theme: " + ex.getMessage());
        }
    }
}
