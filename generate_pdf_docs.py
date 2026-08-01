import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

def build_project_manual_pdf():
    pdf_filename = "PrepSpace_Project_Manual.pdf"
    artifact_dir = r"C:\Users\Nagesh\.gemini\antigravity\brain\69d1292e-0547-405f-9445-386116a1098c"
    artifact_path = os.path.join(artifact_dir, pdf_filename)

    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36
    )

    styles = getSampleStyleSheet()

    PRIMARY = colors.HexColor("#0f172a")    # Dark Navy
    ACCENT = colors.HexColor("#6366f1")     # Indigo
    CYAN = colors.HexColor("#0284c7")       # Deep Cyan
    TEXT_DARK = colors.HexColor("#1e293b")  # Dark Slate Text
    MUTED = colors.HexColor("#64748b")      # Gray

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=PRIMARY,
        alignment=TA_CENTER,
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=MUTED,
        alignment=TA_CENTER,
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=CYAN,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=PRIMARY,
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=TEXT_DARK,
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=body_style,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=4
    )

    code_style = ParagraphStyle(
        'Code',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor("#0f172a"),
        backColor=colors.HexColor("#f1f5f9"),
        borderColor=colors.HexColor("#cbd5e1"),
        borderWidth=0.5,
        borderPadding=5,
        spaceBefore=4,
        spaceAfter=6
    )

    story = []

    # Title Header
    story.append(Paragraph("📖 PrepSpace — Complete Technical Manual", title_style))
    story.append(Paragraph("Full-Stack AI-Powered Interview Preparation & Career Portal Guide<br/><b>Author: Nagesh Methre</b> | System Version: 0.0.1-SNAPSHOT | Production Live", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceBefore=0, spaceAfter=12))

    # 1. Executive Summary & Purpose
    story.append(Paragraph("1. Executive Summary & System Purpose", h1_style))
    story.append(Paragraph(
        "<b>PrepSpace</b> is a unified, enterprise-grade software platform engineered to solve the fragmentation problem "
        "faced by software engineering candidates during interview preparation. Rather than maintaining scattered records across "
        "LeetCode, Notion, spreadsheets, YouTube, and email pipelines, PrepSpace provides a single, cohesive workspace that integrates "
        "question practice, spaced-repetition flashcards, AI mock interviews, job application tracking, activity heatmaps, and a 15-module settings suite.",
        body_style
    ))

    # 2. System Architecture & Tech Stack
    story.append(Paragraph("2. System Architecture & Tech Stack", h1_style))
    tech_data = [
        [Paragraph("<b>Component Layer</b>", body_style), Paragraph("<b>Technology / Framework</b>", body_style), Paragraph("<b>Version / Specification</b>", body_style)],
        ["Backend Framework", "Spring Boot", "v3.3.1 (Java 21 LTS)"],
        ["Security & Tokens", "Spring Security + JJWT", "HMAC-SHA256 JWT & BCrypt Hashing"],
        ["Database Engine", "PostgreSQL Cloud DB", "PostgreSQL 15/16 with HikariCP"],
        ["ORM Persistence", "Spring Data JPA & Hibernate", "Hibernate 6.5.2.Final"],
        ["Frontend UI", "Vanilla HTML5 / Custom CSS3 / JS", "Native Dynamic Single Page Application"],
        ["Document Exports", "iText PDF & Apache POI", "PDF readiness reports & Excel exports"]
    ]
    t_tech = Table(tech_data, colWidths=[120, 180, 240])
    t_tech.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#e2e8f0")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_tech)
    story.append(Spacer(1, 8))

    # 3. Database Schema Reference
    story.append(Paragraph("3. Core Database Schema Reference", h1_style))
    story.append(Paragraph("Key Entities & DDL Tables:", h2_style))
    story.append(Paragraph("<b>users</b>: Primary user accounts (<code>id, name, email, password, role, created_at</code>).", bullet_style))
    story.append(Paragraph("<b>user_settings</b>: 31 persisted layout, security, career, and API settings properties.", bullet_style))
    story.append(Paragraph("<b>job_applications</b>: Track company, role, status (APPLIED, SCREENING, INTERVIEW, OFFER), salary.", bullet_style))
    story.append(Paragraph("<b>mock_interviews</b>: AI session topics, scores, feedback notes, scheduled dates.", bullet_style))
    story.append(Paragraph("<b>device_sessions</b>: Active login audits tracking IP, user agent, and remote revocation flags.", bullet_style))

    # 4. REST API Endpoint Catalog
    story.append(Paragraph("4. REST API Endpoint Catalog (50+ Endpoints)", h1_style))
    api_data = [
        [Paragraph("<b>Category</b>", body_style), Paragraph("<b>Method & Endpoint</b>", body_style), Paragraph("<b>Description</b>", body_style)],
        ["Auth", "POST /api/auth/register", "Register candidate account"],
        ["Auth", "POST /api/auth/login", "Authenticate & issue JWT access token"],
        ["Auth", "POST /api/auth/logout-all", "Revoke all user device sessions"],
        ["Settings", "GET /api/v1/settings", "Fetch 31 settings attributes"],
        ["Settings", "POST /api/v1/settings", "Save updated user settings"],
        ["Settings", "GET /api/v1/settings/sessions", "List active login device sessions"],
        ["Questions", "GET /api/questions", "Searchable DSA & System Design questions"],
        ["Coding", "POST /api/v1/coding/submit", "Submit solution code & get verdict"],
        ["Mock", "POST /api/mock/schedule", "Schedule AI technical mock interview"],
        ["Applications", "GET /api/applications", "Fetch Kanban job application pipeline"],
        ["Reports", "GET /api/reports/export/pdf", "Download PDF readiness report"]
    ]
    t_api = Table(api_data, colWidths=[90, 210, 240])
    t_api.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#e2e8f0")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_api)
    story.append(Spacer(1, 8))

    # 5. 15-Module Settings Guide
    story.append(Paragraph("5. 15-Module Enterprise Settings Suite Guide", h1_style))
    story.append(Paragraph(
        "<b>Identity & Security</b>: Profile (Bio/Links), Security (Password/2FA), Connected Accounts, Devices & Sessions, Data Privacy.<br/>"
        "<b>Preferences & UI</b>: Appearance (Themes/Fonts), Notifications (Email/Toast), Language & Region, Learning Goals, Career Targets.<br/>"
        "<b>Advanced Systems</b>: Dashboard Widgets, Subscription Tier, Data Import/Export, Developer API Keys (`pk_test_...`), System About.",
        body_style
    ))

    # 6. Installation & Deployment
    story.append(Paragraph("6. Step-by-Step Installation & Deployment", h1_style))
    story.append(Paragraph(
        "export SPRING_DATASOURCE_URL=\"jdbc:postgresql://localhost:5432/interview_tracker_db\"<br/>"
        "export SPRING_DATASOURCE_DRIVER_CLASS_NAME=\"org.postgresql.Driver\"<br/>"
        "export SPRING_JPA_DATABASE_PLATFORM=\"org.hibernate.dialect.PostgreSQLDialect\"<br/>"
        "./mvnw clean spring-boot:run",
        code_style
    ))

    # 7. Troubleshooting
    story.append(Paragraph("7. Troubleshooting & Common Issues", h1_style))
    story.append(Paragraph("• <b>HTTP 401 Unauthorized</b>: Ensure password matches DB record (default: <code>Password123</code>).", bullet_style))
    story.append(Paragraph("• <b>Database Driver Fallback</b>: Explicitly configure <code>SPRING_DATASOURCE_DRIVER_CLASS_NAME</code>.", bullet_style))
    story.append(Paragraph("• <b>Auto Logout on Login Fail</b>: Exclude <code>/auth/</code> endpoints from session expiration interceptor.", bullet_style))

    doc.build(story)
    if os.path.exists(artifact_dir):
        doc2 = SimpleDocTemplate(artifact_path, pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
        doc2.build(story)

    print(f"Project Manual PDF updated: {pdf_filename} and {artifact_path}")


def build_presentation_deck_pdf():
    pdf_filename = "PrepSpace_Presentation_Deck.pdf"
    artifact_dir = r"C:\Users\Nagesh\.gemini\antigravity\brain\69d1292e-0547-405f-9445-386116a1098c"
    artifact_path = os.path.join(artifact_dir, pdf_filename)

    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=(720, 405),
        rightMargin=25, leftMargin=25, topMargin=20, bottomMargin=20
    )

    styles = getSampleStyleSheet()

    BG_DARK = colors.HexColor("#0f172a")
    CYAN = colors.HexColor("#38bdf8")
    TEXT_WHITE = colors.HexColor("#f8fafc")
    MUTED = colors.HexColor("#94a3b8")

    slide_title_style = ParagraphStyle(
        'SlideTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=CYAN,
        spaceAfter=4
    )

    slide_sub_style = ParagraphStyle(
        'SlideSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=13,
        textColor=MUTED,
        spaceAfter=12
    )

    card_title_style = ParagraphStyle(
        'CardTitle',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=CYAN,
        spaceAfter=8
    )

    card_bullet_style = ParagraphStyle(
        'CardBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=TEXT_WHITE,
        spaceAfter=4
    )

    slides_content = [
        # Slide 1: Cover
        [
            Paragraph("<font size=24 color='#38bdf8'><b>🚀 PREPSPACE</b></font>", ParagraphStyle('C1', alignment=TA_CENTER)),
            Spacer(1, 6),
            Paragraph("<font size=14 color='#ffffff'><b>Full-Stack AI-Powered Interview Preparation & Career Tracker</b></font>", ParagraphStyle('C2', alignment=TA_CENTER)),
            Spacer(1, 10),
            Paragraph("<font size=10 color='#6366f1'>Spring Boot 3.3.1  |  Java 21  |  PostgreSQL  |  Spring Security JWT  |  Vanilla JS SPA</font>", ParagraphStyle('C3', alignment=TA_CENTER)),
            Spacer(1, 15),
            Paragraph("<font size=9 color='#94a3b8'>Presenter: Nagesh Methre  |  Production Live API: api.stream-in.app</font>", ParagraphStyle('C4', alignment=TA_CENTER))
        ],
        # Slide 2: Problem Statement
        [
            Paragraph("1. Problem Statement & Challenges", slide_title_style),
            Paragraph("The fragmented state of candidate interview preparation", slide_sub_style),
            Table([
                [
                    [Paragraph("Current Industry Pain Points", card_title_style),
                     Paragraph("• Fragmented Tools: 5+ apps (Notion, LeetCode, Excel).", card_bullet_style),
                     Paragraph("• No Unified Analytics: Hard to track weak topics across DSA.", card_bullet_style),
                     Paragraph("• Inconsistent Revision: Lack of spaced repetition.", card_bullet_style)],
                    [Paragraph("Why Candidates Struggle", card_title_style),
                     Paragraph("• Zero Streak Feedback: Hard to maintain 30+ day coding habits.", card_bullet_style),
                     Paragraph("• Security Concerns: Lack of multi-device controls.", card_bullet_style),
                     Paragraph("• Need: Single unified platform for practice & tracking.", card_bullet_style)]
                ]
            ], colWidths=[330, 330])
        ],
        # Slide 3: Solution
        [
            Paragraph("2. Proposed Solution — PrepSpace Portal", slide_title_style),
            Paragraph("Unified full-stack ecosystem for candidate success", slide_sub_style),
            Table([
                [
                    [Paragraph("Centralized Dashboard", card_title_style),
                     Paragraph("• Real-time streak heatmap", card_bullet_style),
                     Paragraph("• Daily question targets", card_bullet_style),
                     Paragraph("• Enrolled courses & progress", card_bullet_style)],
                    [Paragraph("Practice & AI Engine", card_title_style),
                     Paragraph("• Spaced repetition flashcards", card_bullet_style),
                     Paragraph("• AI Mock Interview Simulator", card_bullet_style),
                     Paragraph("• Dynamic topic filter bank", card_bullet_style)],
                    [Paragraph("Enterprise Controls", card_title_style),
                     Paragraph("• 15-module settings panel", card_bullet_style),
                     Paragraph("• Active device session audit", card_bullet_style),
                     Paragraph("• PDF & Excel report exports", card_bullet_style)]
                ]
            ], colWidths=[220, 220, 220])
        ],
        # Slide 4: Tech Stack
        [
            Paragraph("3. System Architecture & Tech Stack", slide_title_style),
            Paragraph("Modern high-performance enterprise micro-monolith", slide_sub_style),
            Table([
                [
                    [Paragraph("Frontend Tier", card_title_style),
                     Paragraph("• Vanilla HTML5 & CSS3", card_bullet_style),
                     Paragraph("• Glassmorphism Dark Theme", card_bullet_style),
                     Paragraph("• Single Page App Router", card_bullet_style)],
                    [Paragraph("Backend Tier", card_title_style),
                     Paragraph("• Spring Boot 3.3.1 (Java 21)", card_bullet_style),
                     Paragraph("• Spring Security JWT Stateless", card_bullet_style),
                     Paragraph("• Hibernate JPA ORM", card_bullet_style)],
                    [Paragraph("Database & Cloud", card_title_style),
                     Paragraph("• PostgreSQL Relational DB", card_bullet_style),
                     Paragraph("• Render Cloud Container Host", card_bullet_style),
                     Paragraph("• SSL Encrypted Traffic", card_bullet_style)]
                ]
            ], colWidths=[220, 220, 220])
        ],
        # Slide 5: Security Blueprint
        [
            Paragraph("4. Security & Authentication Blueprint", slide_title_style),
            Paragraph("Multi-layered protection for user credentials and sessions", slide_sub_style),
            Table([
                [
                    [Paragraph("Authentication & Tokens", card_title_style),
                     Paragraph("• Stateless JWT Tokens: HMAC-SHA256 signed.", card_bullet_style),
                     Paragraph("• BCrypt Password Hashing: Salted hashing.", card_bullet_style),
                     Paragraph("• Role-Based Security: @PreAuthorize rules.", card_bullet_style)],
                    [Paragraph("Session & Lockout Shield", card_title_style),
                     Paragraph("• Lockout Protection: 5 failures = 15-min lock.", card_bullet_style),
                     Paragraph("• Device Control: Track IP & Browser agent.", card_bullet_style),
                     Paragraph("• Remote Revocation: Terminate sessions remotely.", card_bullet_style)]
                ]
            ], colWidths=[330, 330])
        ],
        # Slide 6: 15 Modules Settings
        [
            Paragraph("5. 15-Module Enterprise Settings Suite", slide_title_style),
            Paragraph("Comprehensive control center with 31 persisted attributes", slide_sub_style),
            Table([
                [
                    [Paragraph("Identity & Security", card_title_style),
                     Paragraph("1. Profile Settings<br/>2. Security & 2FA<br/>3. Connected Accounts<br/>4. Devices & Sessions<br/>5. Data & Privacy", card_bullet_style)],
                    [Paragraph("Preferences & UI", card_title_style),
                     Paragraph("6. Appearance (Themes)<br/>7. Notifications<br/>8. Language & Region<br/>9. Learning Goals<br/>10. Career & Salary", card_bullet_style)],
                    [Paragraph("Advanced & System", card_title_style),
                     Paragraph("11. Dashboard Widgets<br/>12. Subscription Status<br/>13. Data Import/Export<br/>14. Developer API Keys<br/>15. System About", card_bullet_style)]
                ]
            ], colWidths=[220, 220, 220])
        ],
        # Slide 7: Conclusion
        [
            Paragraph("6. Conclusion & Summary", slide_title_style),
            Paragraph("PrepSpace — Empowering candidate career transformations", slide_sub_style),
            Paragraph("<b>🎯 Key Takeaways:</b>", card_title_style),
            Spacer(1, 4),
            Paragraph("• <b>Unified Solution</b>: Solves fragmented interview prep with Spring Boot + Vanilla JS.", card_bullet_style),
            Paragraph("• <b>Enterprise Security</b>: Stateless JWT + BCrypt auth with 15 settings modules.", card_bullet_style),
            Paragraph("• <b>Production Live</b>: Fully deployed on Render Cloud + PostgreSQL DB.", card_bullet_style),
            Spacer(1, 15),
            Paragraph("<font size=14 color='#38bdf8'><b>Thank you! Any Questions?</b></font>", ParagraphStyle('EndP', alignment=TA_CENTER))
        ]
    ]

    story = []
    for i, slide_elements in enumerate(slides_content):
        story.extend(slide_elements)
        if i < len(slides_content) - 1:
            story.append(PageBreak())

    def draw_bg(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(BG_DARK)
        canvas.rect(0, 0, 720, 405, fill=1, stroke=0)
        canvas.restoreState()

    doc.build(story, onFirstPage=draw_bg, onLaterPages=draw_bg)

    if os.path.exists(artifact_dir):
        doc2 = SimpleDocTemplate(artifact_path, pagesize=(720, 405), rightMargin=25, leftMargin=25, topMargin=20, bottomMargin=20)
        doc2.build(story, onFirstPage=draw_bg, onLaterPages=draw_bg)

    print(f"Presentation Deck PDF updated: {pdf_filename} and {artifact_path}")

if __name__ == "__main__":
    build_project_manual_pdf()
    build_presentation_deck_pdf()
