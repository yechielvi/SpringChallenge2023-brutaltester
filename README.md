# SpringChallenge2023

Source code for CodinGame's Spring Challenge 2023 event.

https://www.codingame.com/contests/spring-challenge-2023

Community starter AIs are located here:

https://github.com/CodinGame/SpringChallenge2023/tree/main/starterAIs

# How to use brutal tester

1. Build with `mvn package`

If referee is companing about inaccessible object, just do like this when passing referee to brutal tester:
```
java --add-opens java.base/java.lang=ALL-UNNAMED -jar referee.jar
```
