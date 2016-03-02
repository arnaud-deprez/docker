FROM java:8-jre
MAINTAINER Arnaud Deprez <arnaudeprez@gmail.com>

ENV DOCKERIZE_VERSION v0.2.0
#This works with elasticsearch 1.7.2
ENV ELASTICSEARCH_JDBC_VERSION 1.7.2.1

# Install base packages
RUN apt-get -y update \
 && apt-get install -y unzip wget

# Install dockerize
RUN wget -O /tmp/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
 && tar -C /usr/local/bin -xzvf /tmp/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Install elasticsearch-jdbc
RUN wget -O /tmp/elasticsearch-jdbc-$ELASTICSEARCH_JDBC_VERSION.zip  http://xbib.org/repository/org/xbib/elasticsearch/importer/elasticsearch-jdbc/$ELASTICSEARCH_JDBC_VERSION/elasticsearch-jdbc-$ELASTICSEARCH_JDBC_VERSION-dist.zip \
 && unzip -d /opt /tmp/elasticsearch-jdbc-$ELASTICSEARCH_JDBC_VERSION.zip \
 && ln -s /opt/elasticsearch-jdbc-$ELASTICSEARCH_JDBC_VERSION /opt/elasticsearch-jdbc

# Touch log file
RUN mkdir -p /opt/elasticsearch-jdbc/logs \
 && touch /opt/elasticsearch-jdbc/logs/jdbc.log

# Clean up APT when done.
RUN apt-get remove -y unzip wget \
 && apt-get autoremove -y \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /opt/elasticsearch-jdbc
