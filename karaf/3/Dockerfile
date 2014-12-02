FROM dockerfile/java:oracle-java8
MAINTAINER Arnaud Deprez (arnaudeprez@gmail.com)

# export JAVA_HOME environment variable
ENV JAVA_HOME /usr/lib/jvm/java-8-oracle

# Install Servicemix
RUN wget http://archive.apache.org/dist/karaf/3.0.2/apache-karaf-3.0.2.tar.gz; \
    tar -xzf apache-karaf-3.0.2.tar.gz -C /opt; \
    rm apache-karaf-3.0.2.tar.gz; \
    ln -s /opt/apache-karaf-3.0.2 /opt/karaf

# Expose JMX (1099 and 44444), ssh (8101), http (8181)
EXPOSE 1099 44444 8101 8181

# export KARAF_HOME
ENV KARAF_HOME /opt/karaf

VOLUME ["/opt/karaf/deploy"]

# Use the servicemix script as entrypoint
ENTRYPOINT ["/opt/karaf/bin/karaf"]