FROM dockerfile/java:oracle-java7
MAINTAINER Arnaud Deprez (arnaudeprez@gmail.com)

ENV JAVA_HOME /usr/lib/jvm/java-7-oracle

RUN wget http://archive.apache.org/dist/servicemix/servicemix-4/4.5.3/apache-servicemix-4.5.3.tar.gz; \
    tar -xzf apache-servicemix-5.1.1.zip -C /opt; \
    rm apache-servicemix-4.5.3.tar.gz; \
    ln -s /opt/apache-servicemix-5.1.1 /opt/servicemix

EXPOSE 1099 8101 8181 61616 36888 44444
ENTRYPOINT ["/opt/servicemix/bin/servicemix"]