FROM eclipse-temurin:17.0.8.1_1-jdk-jammy
COPY . .
RUN chmod +x mvnw
RUN ./mvnw clean install -DskipTests
ENTRYPOINT [ "jar", "-jar", "target/cardapio-0.0.1-SNAPSHOT.jar" ]
