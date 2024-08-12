# Use an official OpenJDK image as a base
FROM openjdk:17-jdk-slim AS build

# Install Maven
RUN apt-get update && apt-get install -y maven

# Set the working directory in the container
WORKDIR /backend

# Copy the pom.xml and src directory to the working directory
COPY pom.xml .
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# Use the same OpenJDK image to run the application
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /backend

# Copy the jar file from the build stage to the working directory
COPY --from=build /backend/target/*.jar app.jar

# Command to run the application
CMD ["java", "-jar", "app.jar"]
