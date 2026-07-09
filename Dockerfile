# Stage 1: Build Phase
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
# Download dependencies (cached layer)
RUN mvn dependency:go-offline -B
COPY backend/src ./backend/src
COPY database ./database
# Package application
RUN mvn package -DskipTests

# Stage 2: Run Phase
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/InterviewPreparationTracker-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
