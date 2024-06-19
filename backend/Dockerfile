FROM maven:3.8.5-openjdk-17 as build
COPY . .
RUN chmod +x mvnw
RUN ./mvnw clean install -DskipTests
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "target/cardapio-0.0.1-SNAPSHOT.jar"]
