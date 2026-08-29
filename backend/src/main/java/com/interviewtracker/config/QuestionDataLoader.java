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
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
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
        if (questionRepository.count() == 0) {
            logger.info("Database coding questions table is empty. Starting bulk JSON import...");
            try {
                ClassPathResource resource = new ClassPathResource("questions.json");
                try (InputStream inputStream = resource.getInputStream()) {
                    List<InterviewQuestion> questions = objectMapper.readValue(
                        inputStream, 
                        new TypeReference<List<InterviewQuestion>>() {}
                    );
                    questionRepository.saveAll(questions);
                    logger.info("Successfully imported {} coding questions into the database.", questions.size());
                }
            } catch (Exception e) {
                logger.error("Failed to load questions.json from classpath. Seeding skipped.", e);
            }
        } else {
            logger.info("Coding questions table already seeded. Skipping JSON import.");
        }

        // 2. Seed Default Settings & Adsense/SEO
        seedSetting("PRODUCT_PRICE_INR", "99");
        seedSetting("REFERRAL_REWARD_INR", "49");
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

        // 4. Seed Default Courses & Certifications
        if (courseRepository.count() < 8) {
            logger.info("Database courses table is empty or outdated. Cleaning and seeding 8 comprehensive certifications...");
            courseRepository.deleteAll();
            
            // 1. Python Programming Masterclass
            Course pythonCourse = Course.builder()
                    .title("Python Programming Masterclass")
                    .description("Learn Python syntax, OOP, virtual environments, data structures, automation scripting, and API integrations.")
                    .instructor("Jose Portilla")
                    .duration("25 Hours")
                    .difficulty("BEGINNER")
                    .thumbnailUrl("https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5")
                    .courseLink("https://stream-in.app")
                    .prerequisites("None")
                    .rating(4.7)
                    .enrollmentCount(152)
                    .lessons(new ArrayList<>())
                    .build();
            
            Lesson pyL1 = Lesson.builder()
                    .course(pythonCourse)
                    .title("Variables, Types, and Conditional Control Loops")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/py_basics.pdf")
                    .assignments("Write a script that prints primes up to 100.")
                    .quizQuestions("[{\"question\":\"Which keyword is used to define functions in Python?\",\"options\":[\"func\",\"def\",\"function\",\"define\"],\"answer\":\"def\"}]")
                    .build();
            Lesson pyL2 = Lesson.builder()
                    .course(pythonCourse)
                    .title("Advanced Python Collections: Tuples, Sets, and Dicts")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/py_collections.pdf")
                    .assignments("Create a program that deduplicates string array inputs using Sets.")
                    .quizQuestions("[{\"question\":\"Which type is mutable in Python?\",\"options\":[\"tuple\",\"list\",\"str\",\"int\"],\"answer\":\"list\"}]")
                    .build();
            pythonCourse.getLessons().add(pyL1);
            pythonCourse.getLessons().add(pyL2);
            courseRepository.save(pythonCourse);

            // 2. Full-Stack Java & OOP Developer Masterclass
            Course javaCourse = Course.builder()
                    .title("Full-Stack Java & OOP Developer Masterclass")
                    .description("Master Java 21 features, Spring Boot Microservices, OOP Design Patterns, and Hibernate/JPA integration.")
                    .instructor("Dr. Angela Yu")
                    .duration("40 Hours")
                    .difficulty("INTERMEDIATE")
                    .thumbnailUrl("https://images.unsplash.com/photo-1517694712202-14dd9538aa97")
                    .courseLink("https://stream-in.app")
                    .prerequisites("Basic programming concepts")
                    .rating(4.9)
                    .enrollmentCount(128)
                    .lessons(new ArrayList<>())
                    .build();
            
            Lesson javaL1 = Lesson.builder()
                    .course(javaCourse)
                    .title("Introduction to OOP & JVM Internals")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/java_oop.pdf")
                    .assignments("Implement a simple library management system using class inheritance.")
                    .quizQuestions("[{\"question\":\"Which area in memory stores Java object instances?\",\"options\":[\"Stack\",\"Heap\",\"Metaspace\",\"Register\"],\"answer\":\"Heap\"}]")
                    .build();
            Lesson javaL2 = Lesson.builder()
                    .course(javaCourse)
                    .title("Java Collections Framework & Streams API")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/java_collections.pdf")
                    .assignments("Filter a list of employees based on salary criteria using streams.")
                    .quizQuestions("[{\"question\":\"Which list implementation has O(1) random retrieval time?\",\"options\":[\"LinkedList\",\"ArrayList\",\"Vector\",\"Stack\"],\"answer\":\"ArrayList\"}]")
                    .build();
            javaCourse.getLessons().add(javaL1);
            javaCourse.getLessons().add(javaL2);
            courseRepository.save(javaCourse);

            // 3. Artificial Intelligence & Generative AI Bootcamp
            Course mlCourse = Course.builder()
                    .title("Artificial Intelligence & Generative AI Bootcamp")
                    .description("Understand linear regression, decision trees, deep neural networks, model training, attention mechanism, and LLMs.")
                    .instructor("Prof. Andrew Ng")
                    .duration("50 Hours")
                    .difficulty("ADVANCED")
                    .thumbnailUrl("https://images.unsplash.com/photo-1527474305487-b87b222841cc")
                    .courseLink("https://stream-in.app")
                    .prerequisites("Python programming and basic linear algebra")
                    .rating(4.8)
                    .enrollmentCount(95)
                    .lessons(new ArrayList<>())
                    .build();
            
            Lesson mlL1 = Lesson.builder()
                    .course(mlCourse)
                    .title("Machine Learning Fundamentals & Loss Optimizers")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/ml_basics.pdf")
                    .assignments("Train a linear regression model on house price dataset.")
                    .quizQuestions("[{\"question\":\"Which algorithm is commonly used for regression tasks?\",\"options\":[\"K-Means\",\"Linear Regression\",\"Decision Trees\",\"SVM\"],\"answer\":\"Linear Regression\"}]")
                    .build();
            Lesson mlL2 = Lesson.builder()
                    .course(mlCourse)
                    .title("Self-Attention Transformers & GenAI LLM Pipelines")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/transformers.pdf")
                    .assignments("Implement a semantic prompt wrapper using dynamic vector embeddings.")
                    .quizQuestions("[{\"question\":\"What mechanism allows Transformers to weigh token dependencies dynamically?\",\"options\":[\"Convolution\",\"Pooling\",\"Attention\",\"Dropout\"],\"answer\":\"Attention\"}]")
                    .build();
            mlCourse.getLessons().add(mlL1);
            mlCourse.getLessons().add(mlL2);
            courseRepository.save(mlCourse);

            // 4. Data Science & Analytics Foundations
            Course dsCourse = Course.builder()
                    .title("Data Science & Analytics Foundations")
                    .description("Learn data science pipelines using NumPy, Pandas, Matplotlib, exploratory data analysis (EDA), and probability stats.")
                    .instructor("Kiry Decamp")
                    .duration("30 Hours")
                    .difficulty("INTERMEDIATE")
                    .thumbnailUrl("https://images.unsplash.com/photo-1460925895917-afdab827c52f")
                    .courseLink("https://stream-in.app")
                    .prerequisites("Basic mathematics and logic")
                    .rating(4.6)
                    .enrollmentCount(110)
                    .lessons(new ArrayList<>())
                    .build();
            
            Lesson dsL1 = Lesson.builder()
                    .course(dsCourse)
                    .title("Data Manipulation & Dataframes with Pandas")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/ds_pandas.pdf")
                    .assignments("Filter out null values from user telemetry log files using Pandas.")
                    .quizQuestions("[{\"question\":\"Which function loads a CSV file into a Pandas DataFrame?\",\"options\":[\"read_table()\",\"load_csv()\",\"read_csv()\",\"dataframe_csv()\"],\"answer\":\"read_csv()\"}]")
                    .build();
            dsCourse.getLessons().add(dsL1);
            courseRepository.save(dsCourse);

            // 5. Modern Web Development Boot Camp (React & Next.js)
            Course webCourse = Course.builder()
                    .title("Modern Web Development (React & Next.js)")
                    .description("Learn HTML5, CSS3 Grid/Flexbox, JavaScript ES6+, dynamic DOM bindings, React components, hooks, and Next.js server routing.")
                    .instructor("Colt Steele")
                    .duration("45 Hours")
                    .difficulty("BEGINNER")
                    .thumbnailUrl("https://images.unsplash.com/photo-1547082299-de196ea013d6")
                    .courseLink("https://stream-in.app")
                    .prerequisites("None")
                    .rating(4.8)
                    .enrollmentCount(320)
                    .lessons(new ArrayList<>())
                    .build();
            
            Lesson webL1 = Lesson.builder()
                    .course(webCourse)
                    .title("HTML5 Semantic Tags & CSS Box Model")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/web_html.pdf")
                    .assignments("Create a fully responsive navbar layout using CSS Flexbox layouts.")
                    .quizQuestions("[{\"question\":\"Which HTML tag is used to specify a footer for a document?\",\"options\":[\"<bottom>\",\"<footer>\",\"<section>\",\"<aside>\"],\"answer\":\"<footer>\"}]")
                    .build();
            Lesson webL2 = Lesson.builder()
                    .course(webCourse)
                    .title("React Hooks: useState, useEffect, and Context API")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/web_react.pdf")
                    .assignments("Create an interactive to-do list counter app.")
                    .quizQuestions("[{\"question\":\"Which React hook handles component side-effects?\",\"options\":[\"useState\",\"useEffect\",\"useContext\",\"useReducer\"],\"answer\":\"useEffect\"}]")
                    .build();
            webCourse.getLessons().add(webL1);
            webCourse.getLessons().add(webL2);
            courseRepository.save(webCourse);

            // 6. Advanced Backend Engineering & Databases
            Course backendCourse = Course.builder()
                    .title("Advanced Backend Engineering & Databases")
                    .description("Learn API design, JWT authentication middlewares, WebSocket messaging, SQL joins, normalization, and MongoDB NoSQL storage.")
                    .instructor("Brad Traversy")
                    .duration("35 Hours")
                    .difficulty("ADVANCED")
                    .thumbnailUrl("https://images.unsplash.com/photo-1555066931-4365d14bab8c")
                    .courseLink("https://stream-in.app")
                    .prerequisites("Web basics and JavaScript / Python knowledge")
                    .rating(4.9)
                    .enrollmentCount(185)
                    .lessons(new ArrayList<>())
                    .build();
            
            Lesson backL1 = Lesson.builder()
                    .course(backendCourse)
                    .title("RESTful API Architectures & Express Middleware")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/express.pdf")
                    .assignments("Write a custom middleware to validate Bearer tokens in incoming headers.")
                    .quizQuestions("[{\"question\":\"Which HTTP method is typically used to create a new resource?\",\"options\":[\"GET\",\"POST\",\"PUT\",\"PATCH\"],\"answer\":\"POST\"}]")
                    .build();
            Lesson backL2 = Lesson.builder()
                    .course(backendCourse)
                    .title("SQL Relational Joins & Indexing Optimizations")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/sql_joins.pdf")
                    .assignments("Write an optimized query linking orders and users profiles with dynamic constraints.")
                    .quizQuestions("[{\"question\":\"Which join returns all matching records from both tables?\",\"options\":[\"Inner Join\",\"Left Join\",\"Right Join\",\"Outer Join\"],\"answer\":\"Inner Join\"}]")
                    .build();
            backendCourse.getLessons().add(backL1);
            backendCourse.getLessons().add(backL2);
            courseRepository.save(backendCourse);

            // 7. DSA Coding Interview Prep Masterclass
            Course dsaCourse = Course.builder()
                    .title("DSA Coding Interview Prep Masterclass")
                    .description("Ace coding interviews with step-by-step analysis of recursion, graphs, trees, and dynamic programming.")
                    .instructor("Abdul Bari")
                    .duration("60 Hours")
                    .difficulty("INTERMEDIATE")
                    .thumbnailUrl("https://images.unsplash.com/photo-1607799279861-4dd421887fb3")
                    .courseLink("https://stream-in.app")
                    .prerequisites("None")
                    .rating(5.0)
                    .enrollmentCount(240)
                    .lessons(new ArrayList<>())
                    .build();
            
            Lesson dsaL1 = Lesson.builder()
                    .course(dsaCourse)
                    .title("Complexity Analysis & Space-Time Tradeoffs")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/dsa_bootcamp.pdf")
                    .assignments("Solve 3 medium Leetcode problems on two pointers technique.")
                    .quizQuestions("[{\"question\":\"What is the time complexity of Binary Search in a sorted array?\",\"options\":[\"O(1)\",\"O(log N)\",\"O(N)\",\"O(N log N)\"],\"answer\":\"O(log N)\"}]")
                    .build();
            Lesson dsaL2 = Lesson.builder()
                    .course(dsaCourse)
                    .title("Graph Traversals: Breadth-First & Depth-First Search")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/graphs.pdf")
                    .assignments("Implement a topological sort solver using DFS recursion.")
                    .quizQuestions("[{\"question\":\"Which data structure is typically used to implement Breadth-First Search?\",\"options\":[\"Stack\",\"Queue\",\"Heap\",\"BST\"],\"answer\":\"Queue\"}]")
                    .build();
            dsaCourse.getLessons().add(dsaL1);
            dsaCourse.getLessons().add(dsaL2);
            courseRepository.save(dsaCourse);

            // 8. Computer Science Core Fundamentals & System Design
            Course csCourse = Course.builder()
                    .title("Computer Science Core Fundamentals & System Design")
                    .description("Learn operating systems scheduling, computer network layers, database normalization, system design load-balancing, and cloud caches.")
                    .instructor("Gaurav Sen")
                    .duration("30 Hours")
                    .difficulty("ADVANCED")
                    .thumbnailUrl("https://images.unsplash.com/photo-1501504905252-473c47e087f8")
                    .courseLink("https://stream-in.app")
                    .prerequisites("Basic computing concepts")
                    .rating(4.8)
                    .enrollmentCount(165)
                    .lessons(new ArrayList<>())
                    .build();
            
            Lesson csL1 = Lesson.builder()
                    .course(csCourse)
                    .title("Operating Systems CPU Scheduling & Deadlocks")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/os_core.pdf")
                    .assignments("Describe 4 conditions required for deadlock configurations.")
                    .quizQuestions("[{\"question\":\"What condition is NOT required for a deadlock to occur?\",\"options\":[\"Mutual Exclusion\",\"Hold and Wait\",\"No Preemption\",\"Preemption\"],\"answer\":\"Preemption\"}]")
                    .build();
            Lesson csL2 = Lesson.builder()
                    .course(csCourse)
                    .title("Computer Networks: TCP/IP Layer Protocol Stack")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/networks.pdf")
                    .assignments("Compare UDP and TCP protocols reliability features.")
                    .quizQuestions("[{\"question\":\"At which layer of the OSI model does IP routing operate?\",\"options\":[\"Physical\",\"Data Link\",\"Network\",\"Transport\"],\"answer\":\"Network\"}]")
                    .build();
            csCourse.getLessons().add(csL1);
            csCourse.getLessons().add(csL2);
            courseRepository.save(csCourse);
            
            logger.info("Successfully seeded all 8 default certification courses.");
        }
    }

    private void seedSetting(String key, String defaultValue) {
        if (!systemSettingRepository.existsById(key)) {
            systemSettingRepository.save(new SystemSetting(key, defaultValue));
            logger.info("Seeded setting: {} = {}", key, defaultValue);
        }
    }
}
