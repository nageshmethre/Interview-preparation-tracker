# Stage 1: Build Phase
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY backend/src ./backend/src
COPY database ./database
# Package application
RUN mvn package -DskipTests

# Stage 2: Run Phase
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/InterviewPreparationTracker-0.0.1-SNAPSHOT.jar app.jar
COPY --from=build /app/database ./database

# Run container as non-root user
RUN groupadd -g 10001 appgroup && \
    useradd -u 10001 -g appgroup -m -s /bin/bash appuser && \
    chown -R appuser:appgroup /app
USER appuser

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
