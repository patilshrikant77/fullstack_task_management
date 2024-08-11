# Use an official Maven image to build the application
FROM maven:3.8.6-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and project files
COPY . .

# Build the application
RUN mvn clean package

# Use an OpenJDK runtime image for the final stage
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/tms-0.0.1-SNAPSHOT.jar

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "your-app.jar"]
