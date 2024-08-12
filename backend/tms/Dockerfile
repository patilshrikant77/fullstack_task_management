# Use an official Maven image to build the app
FROM maven:3.8.7-openjdk-17 AS build
WORKDIR /backend
COPY . /backend
RUN mvn clean package -DskipTests

# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim
WORKDIR /backend
COPY --from=build /backend/tms/target/*.jar app.jar

# Command to run the application
CMD ["java", "-jar", "app.jar"]
