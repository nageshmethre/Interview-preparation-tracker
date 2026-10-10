package com.interviewtracker.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewtracker.entity.InterviewQuestion;
import com.interviewtracker.entity.User;
import com.interviewtracker.entity.SystemSetting;
import com.interviewtracker.entity.Course;
import com.interviewtracker.entity.Lesson;
import com.interviewtracker.repository.InterviewQuestionRepository;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.repository.SystemSettingRepository;
import com.interviewtracker.repository.CourseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@Transactional
public class QuestionDataLoader implements ApplicationRunner {

    private static final Logger logger = LoggerFactory.getLogger(QuestionDataLoader.class);

    @Autowired
    private InterviewQuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SystemSettingRepository systemSettingRepository;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // 1. Seed Coding Questions
        boolean needsImport = (questionRepository.count() == 0);
        if (!needsImport) {
            Optional<InterviewQuestion> sample = questionRepository.findById(1);
            if (sample.isPresent() && (sample.get().getQuestion() == null || sample.get().getConstraintsText() == null)) {
                needsImport = true;
                logger.info("Existing questions detected with missing columns (question/constraintsText). Re-synchronizing from questions.json...");
            }
        }
        if (needsImport) {
            logger.info("Starting bulk JSON import into coding questions table...");
            try {
                ClassPathResource resource = new ClassPathResource("questions.json");
                try (InputStream inputStream = resource.getInputStream()) {
                    List<InterviewQuestion> questions = objectMapper.readValue(
                        inputStream, 
                        new TypeReference<List<InterviewQuestion>>() {}
                    );
                    questionRepository.deleteAll();
                    questionRepository.saveAll(questions);
                    logger.info("Successfully imported {} coding questions into the database.", questions.size());
                }
            } catch (Exception e) {
                logger.error("Failed to load questions.json from classpath. Seeding skipped.", e);
            }
        } else {
            logger.info("Coding questions table already seeded with valid columns. Skipping JSON import.");
        }

        // 2. Seed Default Settings & Adsense/SEO
        seedOrUpdateSetting("PRODUCT_PRICE_INR", "399", "99");
        seedOrUpdateSetting("REFERRAL_REWARD_INR", "199", "49");
        seedSetting("MIN_WITHDRAWAL_INR", "100");
        seedSetting("ADSENSE_PUBLISHER_ID", "ca-pub-4662205173096609");
        seedSetting("SEO_META_TITLE", "PrepSpace - Premium Interview Preparation Tracker SaaS");
        seedSetting("SEO_META_DESCRIPTION", "Track your technical interview prep lifecycle. Manage study plans, log DSA practice, analyze readiness, and organize mock evaluations on a single premium dashboard.");
        seedSetting("ROBOTS_TXT_STATUS", "INDEX_FOLLOW");

        // 3. Seed or Update default Super Admin User with requested password
        Optional<User> adminOpt = userRepository.findByEmail("admin@tracker.com");
        if (adminOpt.isPresent()) {
            User admin = adminOpt.get();
            admin.setPassword(passwordEncoder.encode("NNSSmm87345dd@@&#8&Nm"));
            admin.setRole("ADMIN_SUPER");
            userRepository.save(admin);
            logger.info("Super Admin password updated successfully on boot.");
        } else {
            logger.info("No Super Admin found. Seeding default admin account (admin@tracker.com)...");
            User admin = User.builder()
                    .email("admin@tracker.com")
                    .name("Super Admin")
                    .password(passwordEncoder.encode("NNSSmm87345dd@@&#8&Nm"))
                    .role("ADMIN_SUPER")
                    .isPaid(true)
                    .failedLoginAttempts(0)
                    .build();
            userRepository.save(admin);
            logger.info("Super Admin account seeded successfully with requested password.");
        }

        // 3.5 Seed Baseline Candidate Accounts Roster if DB only has admin (count <= 1)
        if (userRepository.count() <= 1) {
            logger.info("Database contains only admin account. Seeding baseline candidate accounts roster...");
            List<User> seedCandidates = List.of(
                User.builder().name("Aarav Sharma").email("aarav.sharma@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(true).referralCode("AARAV2026").referralEarnings(398.0).build(),
                User.builder().name("Priya Patel").email("priya.patel@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(true).referralCode("PRIYA99").referralEarnings(597.0).build(),
                User.builder().name("Rohan Mehta").email("rohan.mehta@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(false).referralCode("ROHAN24").referralEarnings(0.0).build(),
                User.builder().name("Sneha Reddy").email("sneha.reddy@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(true).referralCode("SNEHA77").referralEarnings(199.0).build(),
                User.builder().name("Vikram Malhotra").email("vikram.m@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(false).referralCode("VIKRAM01").referralEarnings(0.0).build(),
                User.builder().name("Ananya Gupta").email("ananya.gupta@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(true).referralCode("ANANYA_G").referralEarnings(398.0).build(),
                User.builder().name("Aditya Verma").email("aditya.verma@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(false).referralCode("ADITYA9").referralEarnings(0.0).build(),
                User.builder().name("Neha Joshi").email("neha.joshi@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(true).referralCode("NEHA_J").referralEarnings(199.0).build(),
                User.builder().name("Rahul Nair").email("rahul.nair@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(false).referralCode("RAHUL_N").referralEarnings(0.0).build(),
                User.builder().name("Ishita Sen").email("ishita.sen@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(true).referralCode("ISHITA2026").referralEarnings(398.0).build(),
                User.builder().name("Karthik Subramanian").email("karthik.subramanian@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(false).referralCode("KARTHIK_S").referralEarnings(0.0).build(),
                User.builder().name("Tanvi Kulkarni").email("tanvi.k@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(true).referralCode("TANVI_K").referralEarnings(199.0).build(),
                User.builder().name("Devendra Patil").email("devendra.patil@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(false).referralCode("DEV_P").referralEarnings(0.0).build(),
                User.builder().name("Meera Nambiar").email("meera.nambiar@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(true).referralCode("MEERA_N").referralEarnings(597.0).build(),
                User.builder().name("Ayush Tandon").email("ayush.tandon@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(false).referralCode("AYUSH_T").referralEarnings(0.0).build(),
                User.builder().name("Divya Krishnan").email("divya.krishnan@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(true).referralCode("DIVYA_K").referralEarnings(199.0).build(),
                User.builder().name("Manish Chawla").email("manish.chawla@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(false).referralCode("MANISH_C").referralEarnings(0.0).build(),
                User.builder().name("Pooja Hegde").email("pooja.hegde@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(true).referralCode("POOJA_H").referralEarnings(398.0).build(),
                User.builder().name("Siddharth Rao").email("siddharth.rao@gmail.com").password(passwordEncoder.encode("Student@2026")).role("STUDENT").isPaid(false).referralCode("SIDDHARTH").referralEarnings(0.0).build()
            );
            for (User u : seedCandidates) {
                if (userRepository.findByEmail(u.getEmail()).isEmpty()) {
                    userRepository.save(u);
                }
            }
            logger.info("Successfully seeded baseline student candidates into users table.");
        }

        // 4. Seed & Synchronize Default Courses & Certifications
        logger.info("Synchronizing and verifying all 8 LMS certification courses and video streams...");
        
        seedCourseIfMissing("Python Programming Masterclass", "Learn Python syntax, OOP, virtual environments, data structures, automation scripting, and API integrations.", "Jose Portilla", "25 Hours", "BEGINNER", "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", "None", 4.7, 152, List.of(
            new LessonSeed("Variables, Types, and Conditional Control Loops", "https://www.youtube.com/embed/rfscVS0vtbw", "Write a script that prints primes up to 100.", "[{\"question\":\"Which keyword is used to define functions in Python?\",\"options\":[\"func\",\"def\",\"function\",\"define\"],\"answer\":\"def\"}]"),
            new LessonSeed("Advanced Python Collections: Tuples, Sets, and Dicts", "https://www.youtube.com/embed/HGOBQPFzWKo", "Create a program that deduplicates string array inputs using Sets.", "[{\"question\":\"Which type is mutable in Python?\",\"options\":[\"tuple\",\"list\",\"str\",\"int\"],\"answer\":\"list\"}]")
        ));

        seedCourseIfMissing("Full-Stack Java & OOP Developer Masterclass", "Master Java 21 features, Spring Boot Microservices, OOP Design Patterns, and Hibernate/JPA integration.", "Dr. Angela Yu", "40 Hours", "INTERMEDIATE", "https://images.unsplash.com/photo-1517694712202-14dd9538aa97", "Basic programming concepts", 4.9, 128, List.of(
            new LessonSeed("Introduction to OOP & JVM Internals", "https://www.youtube.com/embed/A74TOX803D0", "Implement a simple library management system using class inheritance.", "[{\"question\":\"Which area in memory stores Java object instances?\",\"options\":[\"Stack\",\"Heap\",\"Metaspace\",\"Register\"],\"answer\":\"Heap\"}]"),
            new LessonSeed("Java Collections Framework & Streams API", "https://www.youtube.com/embed/grEKMHGYyns", "Filter a list of employees based on salary criteria using streams.", "[{\"question\":\"Which list implementation has O(1) random retrieval time?\",\"options\":[\"LinkedList\",\"ArrayList\",\"Vector\",\"Stack\"],\"answer\":\"ArrayList\"}]")
        ));

        seedCourseIfMissing("Artificial Intelligence & Generative AI Bootcamp", "Understand linear regression, decision trees, deep neural networks, model training, attention mechanism, and LLMs.", "Prof. Andrew Ng", "50 Hours", "ADVANCED", "https://images.unsplash.com/photo-1527474305487-b87b222841cc", "Python programming and basic linear algebra", 4.8, 95, List.of(
            new LessonSeed("Machine Learning Fundamentals & Loss Optimizers", "https://www.youtube.com/embed/i_LwzRVP7bg", "Train a linear regression model on house price dataset.", "[{\"question\":\"Which algorithm is commonly used for regression tasks?\",\"options\":[\"K-Means\",\"Linear Regression\",\"Decision Trees\",\"SVM\"],\"answer\":\"Linear Regression\"}]"),
            new LessonSeed("Self-Attention Transformers & GenAI LLM Pipelines", "https://www.youtube.com/embed/kCc8FmEb1nY", "Implement a semantic prompt wrapper using dynamic vector embeddings.", "[{\"question\":\"What mechanism allows Transformers to weigh token dependencies dynamically?\",\"options\":[\"Convolution\",\"Pooling\",\"Attention\",\"Dropout\"],\"answer\":\"Attention\"}]")
        ));

        seedCourseIfMissing("Data Science & Analytics Foundations", "Learn data science pipelines using NumPy, Pandas, Matplotlib, exploratory data analysis (EDA), and probability stats.", "Kiry Decamp", "30 Hours", "INTERMEDIATE", "https://images.unsplash.com/photo-1460925895917-afdab827c52f", "Basic mathematics and logic", 4.6, 110, List.of(
            new LessonSeed("Data Manipulation & Dataframes with Pandas", "https://www.youtube.com/embed/ua-CiDNNj30", "Filter out null values from user telemetry log files using Pandas.", "[{\"question\":\"Which function loads a CSV file into a Pandas DataFrame?\",\"options\":[\"read_table()\",\"load_csv()\",\"read_csv()\",\"dataframe_csv()\"],\"answer\":\"read_csv()\"}]"),
            new LessonSeed("Exploratory Data Analysis & Visualizations", "https://www.youtube.com/embed/GPVsHOlRBBI", "Build distribution charts for customer cohorts using Seaborn.", "[{\"question\":\"Which library is best suited for statistical data visualization in Python?\",\"options\":[\"Requests\",\"Seaborn\",\"Flask\",\"SQLAlchemy\"],\"answer\":\"Seaborn\"}]")
        ));

        seedCourseIfMissing("Modern Web Development (React & Next.js)", "Learn HTML5, CSS3 Grid/Flexbox, JavaScript ES6+, dynamic DOM bindings, React components, hooks, and Next.js server routing.", "Colt Steele", "45 Hours", "BEGINNER", "https://images.unsplash.com/photo-1547082299-de196ea013d6", "None", 4.8, 320, List.of(
            new LessonSeed("HTML5 Semantic Tags & CSS Box Model", "https://www.youtube.com/embed/zJSY8tJY_mM", "Create a fully responsive navbar layout using CSS Flexbox layouts.", "[{\"question\":\"Which HTML tag is used to specify a footer for a document?\",\"options\":[\"<bottom>\",\"<footer>\",\"<section>\",\"<aside>\"],\"answer\":\"<footer>\"}]"),
            new LessonSeed("React Hooks: useState, useEffect, and Context API", "https://www.youtube.com/embed/bMknfKXIFA8", "Create an interactive to-do list counter app.", "[{\"question\":\"Which React hook handles component side-effects?\",\"options\":[\"useState\",\"useEffect\",\"useContext\",\"useReducer\"],\"answer\":\"useEffect\"}]")
        ));

        seedCourseIfMissing("Advanced Backend Engineering & Databases", "Learn API design, JWT authentication middlewares, WebSocket messaging, SQL joins, normalization, and MongoDB NoSQL storage.", "Brad Traversy", "35 Hours", "ADVANCED", "https://images.unsplash.com/photo-1555066931-4365d14bab8c", "Web basics and JavaScript / Python knowledge", 4.9, 185, List.of(
            new LessonSeed("RESTful API Architectures & Express Middleware", "https://www.youtube.com/embed/tN6oTFNWjoo", "Write a custom middleware to validate Bearer tokens in incoming headers.", "[{\"question\":\"Which HTTP method is typically used to create a new resource?\",\"options\":[\"GET\",\"POST\",\"PUT\",\"PATCH\"],\"answer\":\"POST\"}]"),
            new LessonSeed("SQL Relational Joins & Indexing Optimizations", "https://www.youtube.com/embed/HXV3zeRR3h4", "Write an optimized query linking orders and users profiles with dynamic constraints.", "[{\"question\":\"Which join returns all matching records from both tables?\",\"options\":[\"Inner Join\",\"Left Join\",\"Right Join\",\"Outer Join\"],\"answer\":\"Inner Join\"}]")
        ));

        seedCourseIfMissing("DSA Coding Interview Prep Masterclass", "Ace coding interviews with step-by-step analysis of recursion, graphs, trees, and dynamic programming.", "Abdul Bari", "60 Hours", "INTERMEDIATE", "https://images.unsplash.com/photo-1607799279861-4dd421887fb3", "None", 5.0, 240, List.of(
            new LessonSeed("Complexity Analysis & Space-Time Tradeoffs", "https://www.youtube.com/embed/8hly31xKjhc", "Solve 3 medium Leetcode problems on two pointers technique.", "[{\"question\":\"What is the time complexity of Binary Search in a sorted array?\",\"options\":[\"O(1)\",\"O(log N)\",\"O(N)\",\"O(N log N)\"],\"answer\":\"O(log N)\"}]"),
            new LessonSeed("Graph Traversals: Breadth-First & Depth-First Search", "https://www.youtube.com/embed/tWVWeAqZ0WU", "Implement a topological sort solver using DFS recursion.", "[{\"question\":\"Which data structure is typically used to implement Breadth-First Search?\",\"options\":[\"Stack\",\"Queue\",\"Heap\",\"BST\"],\"answer\":\"Queue\"}]")
        ));

        seedCourseIfMissing("Computer Science Core Fundamentals & System Design", "Learn operating systems scheduling, computer network layers, database normalization, system design load-balancing, and cloud caches.", "Gaurav Sen", "30 Hours", "ADVANCED", "https://images.unsplash.com/photo-1501504905252-473c47e087f8", "Basic computing concepts", 4.8, 165, List.of(
            new LessonSeed("Operating Systems CPU Scheduling & Deadlocks", "https://www.youtube.com/embed/4FYEEXuH9g4", "Describe 4 conditions required for deadlock configurations.", "[{\"question\":\"What condition is NOT required for a deadlock to occur?\",\"options\":[\"Mutual Exclusion\",\"Hold and Wait\",\"No Preemption\",\"Preemption\"],\"answer\":\"Preemption\"}]"),
            new LessonSeed("Computer Networks: TCP/IP Layer Protocol Stack", "https://www.youtube.com/embed/3QhU9jd03a0", "Compare UDP and TCP protocols reliability features.", "[{\"question\":\"At which layer of the OSI model does IP routing operate?\",\"options\":[\"Physical\",\"Data Link\",\"Network\",\"Transport\"],\"answer\":\"Network\"}]")
        ));
        
        logger.info("Successfully synchronized all certification courses.");
    }

    private void seedCourseIfMissing(
            String title, String description, String instructor, String duration, String difficulty,
            String thumbnailUrl, String prerequisites, Double rating, Integer enrollmentCount,
            List<LessonSeed> lessonSeeds
    ) {
        java.util.Optional<Course> existing = courseRepository.findByTitle(title);
        if (existing.isPresent()) {
            Course course = existing.get();
            boolean modified = false;
            if (course.getLessons() != null) {
                for (int i = 0; i < course.getLessons().size(); i++) {
                    Lesson lesson = course.getLessons().get(i);
                    if (i < lessonSeeds.size()) {
                        LessonSeed seed = lessonSeeds.get(i);
                        if (lesson.getVideoUrl() == null || lesson.getVideoUrl().contains("w3schools.com")) {
                            lesson.setVideoUrl(seed.videoUrl);
                            modified = true;
                        }
                    }
                }
            }
            if (modified) {
                courseRepository.save(course);
                logger.info("Updated video streaming sources for course: {}", title);
            }
            return;
        }

        Course course = Course.builder()
                .title(title)
                .description(description)
                .instructor(instructor)
                .duration(duration)
                .difficulty(difficulty)
                .thumbnailUrl(thumbnailUrl)
                .courseLink("https://stream-in.app")
                .prerequisites(prerequisites)
                .rating(rating)
                .enrollmentCount(enrollmentCount)
                .lessons(new ArrayList<>())
                .build();

        for (int i = 0; i < lessonSeeds.size(); i++) {
            LessonSeed seed = lessonSeeds.get(i);
            Lesson lesson = Lesson.builder()
                    .course(course)
                    .title(seed.title)
                    .videoUrl(seed.videoUrl)
                    .pdfNotesUrl("https://stream-in.app/notes/doc.pdf")
                    .assignments(seed.assignments)
                    .quizQuestions(seed.quizQuestions)
                    .sequenceNumber(i + 1)
                    .build();
            course.getLessons().add(lesson);
        }

        courseRepository.save(course);
        logger.info("Seeded missing course: {}", title);
    }

    private static class LessonSeed {
        String title;
        String videoUrl;
        String assignments;
        String quizQuestions;

        LessonSeed(String title, String videoUrl, String assignments, String quizQuestions) {
            this.title = title;
            this.videoUrl = videoUrl;
            this.assignments = assignments;
            this.quizQuestions = quizQuestions;
        }
    }

    private void seedSetting(String key, String defaultValue) {
        if (!systemSettingRepository.existsById(key)) {
            systemSettingRepository.save(new SystemSetting(key, defaultValue));
            logger.info("Seeded setting: {} = {}", key, defaultValue);
        }
    }

    private void seedOrUpdateSetting(String key, String defaultValue, String oldDefaultValue) {
        Optional<SystemSetting> opt = systemSettingRepository.findById(key);
        if (opt.isEmpty()) {
            systemSettingRepository.save(new SystemSetting(key, defaultValue));
            logger.info("Seeded setting: {} = {}", key, defaultValue);
        } else if (oldDefaultValue != null && oldDefaultValue.equals(opt.get().getValue())) {
            opt.get().setValue(defaultValue);
            systemSettingRepository.save(opt.get());
            logger.info("Updated setting {} from {} to {}", key, oldDefaultValue, defaultValue);
        }
    }
}
