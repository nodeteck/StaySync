FROM maven:3.9.6-eclipse-temurin-21
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY . .
EXPOSE 8080
CMD ["mvn", "spring-boot:run", "-Dspring-boot.run.jvmArguments='-Dspring.profiles.active=dev'"]
