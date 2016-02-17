FROM postgres:9.3
MAINTAINER Arnaud Deprez <arnaudeprez@gmail.com>

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres

RUN mkdir -p /docker-entrypoint-initdb.d
COPY ./init-docker-schema.sh /docker-entrypoint-initdb.d/init-docker-schema.sh
RUN chmod -R +x /docker-entrypoint-initdb.d