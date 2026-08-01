# PrepSpace Core Systems Pseudocode

This document outlines the structured pseudocode and logical workflow algorithms for the core subsystems of **PrepSpace (Interview Preparation Tracker)**. Use these algorithms inside your college project report or presentation documentation.

---

## 🔑 1. User Authentication Subsystem (Web & Desktop Client)

### 1.1 Account Registration Algorithm
```text
ALGORITHM RegisterAccount
INPUT: name, email, password
OUTPUT: Registered User Entity OR Validation Error

BEGIN
    // Validate inputs
    IF email is null OR password is null OR name is null THEN
        THROW BadRequestException("Fields cannot be empty")
    ENDIF

    IF NOT isValidEmailFormat(email) THEN
        THROW BadRequestException("Invalid email format")
    ENDIF

    // Check if user already exists
    IF Database.findUserByEmail(email) EXISTS THEN
        THROW BadRequestException("Email is already registered")
    ENDIF

    // Encrypt password securely using BCrypt (60-char hash)
    String encryptedPassword <- BCrypt.hashPassword(password, strength=10)

    // Construct entity object
    User newUser <- CreateNewUser(
        name: name,
        email: email,
        password: encryptedPassword,
        role: "USER"
    )

    // Save entity to persistent DB (MySQL/PostgreSQL)
    User savedUser <- Database.save(newUser)
    
    // Automatically initialize default settings profile
    UserSettings defaultSettings <- CreateDefaultSettingsForUser(savedUser.id)
    Database.save(defaultSettings)

    RETURN savedUser
END
```

### 1.2 Web JWT Login Algorithm
```text
ALGORITHM WebLogin
INPUT: email, password, ipAddress, userAgent
OUTPUT: JWT Access Token and HTTP-Only Cookies OR Authentication Exception

BEGIN
    // 1. Check account lockout limit (lock for 15 mins if failures > 5)
    IF LoginAttemptService.isLocked(email) THEN
        THROW LockedException("Too many failed attempts. Account locked.")
    ENDIF

    // 2. Fetch User Profile
    User user <- Database.findUserByEmail(email)
    IF user DOES NOT EXIST THEN
        LoginAttemptService.registerFailure(email)
        THROW BadCredentialsException("Invalid email or password")
    ENDIF

    // 3. Verify BCrypt Password Match
    Boolean isMatch <- BCrypt.checkPassword(password, user.password)
    IF isMatch IS FALSE THEN
        LoginAttemptService.registerFailure(email)
        THROW BadCredentialsException("Invalid email or password")
    ENDIF

    // 4. Success: Reset failure counter
    LoginAttemptService.resetFailures(email)

    // 5. Generate secure JSON Web Token (JWT)
    String jwtToken <- JwtTokenProvider.generateToken(
        subject: user.email,
        claims: { "role": user.role },
        expiration: 15 MINUTES
    )

    // 6. Audit & Log active device session
    DeviceSession session <- CreateDeviceSession(
        user: user,
        tokenId: JwtTokenProvider.getJti(jwtToken),
        ip: ipAddress,
        client: userAgent,
        isActive: true
    )
    Database.save(session)

    RETURN AuthResponse(
        token: jwtToken,
        name: user.name,
        email: user.email,
        role: user.role
    )
END
```

---

## 🎓 2. LMS Course Progress & Certificate Unlock Subsystem

### 2.1 Mark Lesson Completed & Update Course Progress
```text
ALGORITHM CompleteLesson
INPUT: userId, courseId, lessonId, quizScore
OUTPUT: Updated Course Enrollment Progress Percentage

BEGIN
    // 1. Fetch user enrollment
    Enrollment enrollment <- Database.findEnrollment(userId, courseId)
    IF enrollment DOES NOT EXIST THEN
        THROW ResourceNotFoundException("Not enrolled in this course")
    ENDIF

    // 2. Add or update lesson completion status
    LessonProgress progress <- Database.findLessonProgress(userId, lessonId)
    IF progress DOES NOT EXIST THEN
        progress <- CreateLessonProgress(
            userId: userId, 
            lessonId: lessonId, 
            completed: TRUE, 
            score: quizScore,
            completionDate: CurrentTimestamp()
        )
    ELSE
        progress.score <- max(progress.score, quizScore)
        progress.completed <- TRUE
    ENDIF
    Database.save(progress)

    // 3. Calculate overall course progress percentage
    Integer totalLessons <- Database.countLessonsByCourseId(courseId)
    Integer completedLessons <- Database.countCompletedLessons(userId, courseId)
    
    Double progressPercent <- (Double(completedLessons) / Double(totalLessons)) * 100.0
    enrollment.progressPercentage <- progressPercent

    // 4. Check if course is fully completed
    IF progressPercent >= 100.0 AND enrollment.completedAt IS NULL THEN
        enrollment.completedAt <- CurrentTimestamp()
        
        // Trigger automated certificate issue flow
        GenerateCertificate(userId, courseId)
    ENDIF

    Database.save(enrollment)
    RETURN progressPercent
END
```

### 2.2 Certificate Generation Flow
```text
ALGORITHM GenerateCertificate
INPUT: userId, courseId
OUTPUT: Saved Certificate Entity

BEGIN
    // Safety check: verify if certificate already generated
    IF Database.findCertificate(userId, courseId) EXISTS THEN
        RETURN // Already generated
    ENDIF

    User user <- Database.findUserById(userId)
    Course course <- Database.findCourseById(courseId)

    // Generate verified unique SHA-256 certificate code
    String rawSalt <- user.email + "-" + courseId + "-" + CurrentTimestamp().toString()
    String certificateId <- "CERT-" + HashSHA256(rawSalt).substring(0, 16).toUpperCase()

    // Setup verification landing URL
    String verifyUrl <- "https://stream-in.app/verify/" + certificateId

    // Construct certificate metadata
    Certificate cert <- CreateCertificate(
        user: user,
        course: course,
        certificateId: certificateId,
        studentName: user.name,
        courseName: course.title,
        completionDate: CurrentTimestamp(),
        verificationUrl: verifyUrl,
        instructorSignature: "Dr. Helen Carter",
        qrCode: "/assets/qrcodes/" + certificateId + ".png"
    )

    Database.save(cert)
    RETURN cert
END
```

---

## 📊 3. Dashboard Analytics Aggregator

### 3.1 Fetch Dashboard Statistics Algorithm
```text
ALGORITHM GetDashboardStats
INPUT: userEmail
OUTPUT: DashboardStatsDTO Object

BEGIN
    User user <- Database.findUserByEmail(userEmail)
    Integer userId <- user.id

    // 1. Calculate study hours from completed topic logs
    Long totalMinutes <- Database.sumTimeSpentByUserId(userId)
    Double totalHours <- (totalMinutes == NULL) ? 0.0 : RoundToOneDecimal(totalMinutes / 60.0)

    // 2. Count completed topic modules
    Long completedCount <- Database.countCompletedTopics(userId)

    // 3. Count future mock interviews
    DateTime now <- CurrentTimestamp()
    Long upcomingInterviews <- Database.countUpcomingMockInterviews(userId, now)

    // 4. Get active job applications count
    Long jobAppsCount <- Database.countJobApplicationsByUserId(userId)

    // 5. Gather weekly study stats (last 7 calendar days)
    Map weeklyStudyTimeline <- EmptyLinkedMap()
    Date today <- CurrentDate()
    FOR i FROM 6 DOWNTO 0 DO
        Date targetDay <- today.minusDays(i)
        weeklyStudyTimeline.put(targetDay.toString(), 0)
    ENDFOR

    List recentProgress <- Database.fetchProgressBetween(userId, today.minusDays(6), today)
    FOR EACH progressRecord IN recentProgress DO
        String dayString <- progressRecord.date.toString()
        IF weeklyStudyTimeline.containsKey(dayString) THEN
            Integer existingMins <- weeklyStudyTimeline.get(dayString)
            weeklyStudyTimeline.put(dayString, existingMins + progressRecord.timeSpent)
        ENDIF
    ENDFOR

    // 6. Build DTO Response payload
    DashboardStatsDTO stats <- DTOBuilder()
        .totalStudyHours(totalHours)
        .completedTopics(completedCount)
        .upcomingInterviewsCount(upcomingInterviews)
        .applicationsCount(jobAppsCount)
        .weeklyStudyTime(weeklyStudyTimeline)
        .build()

    RETURN stats
END
```

---

## 🔌 4. Swing Desktop Client Local Sync (Direct JDBC)

### 4.1 Execute Safe Local CRUD Updates
```text
ALGORITHM ExecuteLocalSyncQuery
INPUT: sqlString, parametersList
OUTPUT: Status code OR Query Failure Error

BEGIN
    Connection conn <- null
    PreparedStatement pstmt <- null
    
    TRY
        // Grab database connection from thread pool
        conn <- DatabaseService.getConnection()
        
        // Open prepared statement block to prevent SQL injection vulnerability
        pstmt <- conn.prepareStatement(sqlString)
        
        // Loop and bind input parameters sequentially
        FOR index FROM 0 TO parametersList.length - 1 DO
            Object param <- parametersList[index]
            IF param IS String THEN
                pstmt.setString(index + 1, param)
            ELSE IF param IS Integer THEN
                pstmt.setInt(index + 1, param)
            ELSE IF param IS Double THEN
                pstmt.setDouble(index + 1, param)
            ELSE IF param IS Boolean THEN
                pstmt.setBoolean(index + 1, param)
            ENDIF
        ENDFOR
        
        Integer rowsAffected <- pstmt.executeUpdate()
        RETURN rowsAffected
        
    CATCH SQLException ex
        LogException("Database query failed: " + ex.message)
        THROW ex
        
    FINALLY
        // Safely close connection resources to prevent thread pool leaks
        IF pstmt IS NOT null THEN pstmt.close() ENDIF
        IF conn IS NOT null THEN conn.close() ENDIF
    ENDTRY
END
```
