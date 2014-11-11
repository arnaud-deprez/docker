FROM dockerfile/java:oracle-java7
MAINTAINER Arnaud Deprez (arnaudeprez@gmail.com)

# export JAVA_HOME environment variable
ENV JAVA_HOME /usr/lib/jvm/java-7-oracle

# Install Servicemix
RUN wget http://archive.apache.org/dist/servicemix/servicemix-4/4.5.3/apache-servicemix-4.5.3.tar.gz; \
    tar -xzf apache-servicemix-4.5.3.tar.gz -C /opt; \
    rm apache-servicemix-4.5.3.tar.gz; \
    ln -s /opt/apache-servicemix-4.5.3 /opt/servicemix

# Expose JMX (1099 and 44444), ssh (8101), http (8181) and JMS port (61616)
EXPOSE 1099 8101 8181 61616 44444

# export SERVICEMIX_HOME
ENV SERVICEMIX_HOME /opt/servicemix

# Use the servicemix script as entrypoint
ENTRYPOINT ["/opt/servicemix/bin/servicemix"]