# Usar uma imagem do JDK 17 como base
FROM openjdk:17-jdk-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o arquivo JAR gerado pelo Spring Boot para o diretório de trabalho
COPY target/*.jar app.jar

# Expor a porta que o Spring Boot utiliza
EXPOSE 8080

# Comando para executar o JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
