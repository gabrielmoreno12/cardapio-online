FROM eclipse-temurin:22
COPY . .
RUN chmod +x mvnw
RUN ./mvnw clean install -DskipTests
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "backend/target/backend-0.0.1-SNAPSHOT.jar"]
