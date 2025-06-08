# Dockerfile (for backend)
# Development stage with hot reload capabilities
FROM maven:3.9.6-eclipse-temurin-21-alpine AS development
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
CMD ["mvn", "spring-boot:run"]

# Build stage for production
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn package -DskipTests

# Production stage
FROM eclipse-temurin:21-jre-alpine AS production
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]