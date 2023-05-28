FROM openjdk:8-jdk-alpine AS build-referee

WORKDIR /app
COPY pom.xml pom.xml
COPY src src
RUN apk add maven
RUN mvn package

FROM openjdk:8-jdk-alpine AS build-brutaltester

WORKDIR /app
RUN apk add git
RUN apk add openssh
RUN apk add maven

RUN git clone https://github.com/dreignier/cg-brutaltester.git
WORKDIR /app/cg-brutaltester
RUN mvn package

FROM openjdk:8-jre-alpine

RUN apk add --update docker openrc

WORKDIR /app
COPY --from=build-referee /app/target/spring-2023-ants-1.0-SNAPSHOT.jar ./
COPY --from=build-brutaltester /app/cg-brutaltester/target/cg-brutaltester-1.0.0-SNAPSHOT.jar ./
COPY ./src/main/resources ./src/main/resources

ENTRYPOINT [ "java", "-jar", "cg-brutaltester-1.0.0-SNAPSHOT.jar", "-r", "java -jar /app/spring-2023-ants-1.0-SNAPSHOT.jar", "-l", "/var/log/brutaltester/" ]