FROM dockerfile/java:oracle-java7
MAINTAINER Arnaud Deprez (arnaudeprez@gmail.com)

# export JAVA_HOME environment variable
ENV JAVA_HOME /usr/lib/jvm/java-7-oracle

# Install Servicemix
RUN wget http://archive.apache.org/dist/karaf/2.4.0/apache-karaf-2.4.0.tar.gz; \
    tar -xzf apache-karaf-2.4.0.tar.gz -C /opt; \
    rm apache-karaf-2.4.0.tar.gz; \
    ln -s /opt/apache-karaf-2.4.0 /opt/karaf

# Expose JMX (1099 and 44444), ssh (8101), http (8181)
EXPOSE 1099 44444 8101 8181

# export KARAF_HOME
ENV KARAF_HOME /opt/karaf

# Use the servicemix script as entrypoint
ENTRYPOINT ["/opt/karaf/bin/karaf"]