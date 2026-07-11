package com.interviewtracker.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
public class SecurityHeadersFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Clickjacking mitigation
        httpResponse.setHeader("X-Frame-Options", "DENY");

        // MIME-type Sniffing mitigation
        httpResponse.setHeader("X-Content-Type-Options", "nosniff");

        // XSS protection browser header (legacy safeguard)
        httpResponse.setHeader("X-XSS-Protection", "1; mode=block");

        // Strict Referrer Policy
        httpResponse.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

        // Content Security Policy (enforcing scripts, styles, frames, images restrictions)
        httpResponse.setHeader("Content-Security-Policy", 
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; " +
            "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://fonts.googleapis.com; " +
            "font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com; " +
            "img-src 'self' data: https:; " +
            "connect-src 'self' https://api.render.com; " +
            "frame-src 'self' https://www.youtube.com;");

        // HSTS (HTTP Strict Transport Security) - Enforces HTTPS
        httpResponse.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

        chain.doFilter(request, response);
    }
}
