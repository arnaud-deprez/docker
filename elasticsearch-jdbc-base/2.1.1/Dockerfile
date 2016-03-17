FROM java:8-jre
MAINTAINER Arnaud Deprez <arnaudeprez@gmail.com>

ENV DOCKERIZE_VERSION v0.2.0
#This works with elasticsearch 2.1.1
ENV ELASTICSEARCH_JDBC_VERSION 2.1.1.2

# Install dockerize
RUN curl -sSL https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz -o /tmp/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz &&\
  tar -C /usr/local/bin -xzvf /tmp/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz &&\
  rm /tmp/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Install elasticsearch-jdbc
RUN apt-get -y update &&\
  apt-get install -y unzip &&\
  curl -sSL http://xbib.org/repository/org/xbib/elasticsearch/importer/elasticsearch-jdbc/$ELASTICSEARCH_JDBC_VERSION/elasticsearch-jdbc-$ELASTICSEARCH_JDBC_VERSION-dist.zip -o /tmp/elasticsearch-jdbc-$ELASTICSEARCH_JDBC_VERSION-dist.zip &&\
  unzip -d /opt /tmp/elasticsearch-jdbc-$ELASTICSEARCH_JDBC_VERSION-dist.zip &&\
  ln -s /opt/elasticsearch-jdbc-$ELASTICSEARCH_JDBC_VERSION /opt/elasticsearch-jdbc &&\
  mkdir -p /opt/elasticsearch-jdbc/logs &&\
  touch /opt/elasticsearch-jdbc/logs/jdbc.log &&\
  apt-get remove -y unzip wget &&\
  apt-get autoremove -y &&\
  apt-get clean &&\
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /opt/elasticsearch-jdbc
