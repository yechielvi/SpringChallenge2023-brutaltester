# SpringChallenge2023

Source code for CodinGame's Spring Challenge 2023 event.

https://www.codingame.com/contests/spring-challenge-2023

Community starter AIs are located here:

https://github.com/CodinGame/SpringChallenge2023/tree/main/starterAIs

# How to use brutal tester

Dockerised so non-Java users can easily build it

And image trading can be easier when using a common container registry

## 1. Docker build

```
docker build -t codingame-brutaltester-spring-2023 .
```

## 2. Run

```
docker run --name brutaltester --rm \
        -v /var/run/docker.sock:/var/run/docker.sock \ # Required so brutaltester container can docker run itself
        -v ~/.docker/config.json:/root/.docker/config.json \ # Optional : may need this so docker can have same credentials as host, and pull on private registries
        -v /var/log/brutaltester:/var/log/brutaltester \ # Optional : this way you can retrive logs on your local filesystem
        codingame-brutaltester-spring-2023
        -p1 "first-player-container-name" 
        -p2 "second-player-container-name" 
        -n 100 # For example : Number of games to play. Any other usual brutaltester options can be used
```

## 3. Sample Player Dockerfile (Java)

For a Java player, sample Dockerfile to convert an "Output.java" to container (change path to your needs) :

```
FROM eclipse-temurin:11-jdk-alpine AS build

WORKDIR /app
COPY ./Output.java ./
RUN javac Output.java

FROM eclipse-temurin:11-jre-alpine

WORKDIR /app
COPY --from=build ./app/*.class ./

ENTRYPOINT [ "java", "Player" ]
```
Can be built with
```
docker build -t my-codingame-2023:latest .
```

Same kind of dockerfile can easily be created for other languages