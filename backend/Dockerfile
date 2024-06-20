# Etapa de build usando Maven com JDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Copiar os arquivos do projeto
COPY src /app/src
COPY pom.xml /app

# Definir o diretório de trabalho
WORKDIR /app

# Executar o Maven para construir o projeto
RUN mvn clean install -DskipTests

# Etapa de runtime usando OpenJDK 21
FROM eclipse-temurin:21-jre

# Copiar o jar gerado para o container
COPY --from=build app/target/cardapio-0.0.1-SNAPSHOT.jar /app/app.jar

# Definir o diretório de trabalho
WORKDIR /app

# Expor a porta 8080
EXPOSE 8080

# Comando para executar a aplicação
CMD ["java", "-jar", "app.jar"]