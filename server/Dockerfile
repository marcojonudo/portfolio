FROM openjdk:8u171-alpine3.7
LABEL maintainer="marco.martinez@feuvert.es"
EXPOSE 8090
ENV DB_URL=db
RUN apk --no-cache add curl
COPY build/libs/*.jar blog-api.jar
CMD java -Dcom.sun.management.jmxremote -Dmicronaut.environments=$ENV -Xmx$MAX_MEMORY -jar blog-api.jar
