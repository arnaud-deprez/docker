FROM java:8
MAINTAINER Arnaud Deprez (arnaudeprez@gmail.com)

ENV KARAF_VERSION 2.4.3

# Install Servicemix
RUN wget http://archive.apache.org/dist/karaf/$KARAF_VERSION/apache-karaf-$KARAF_VERSION.tar.gz; \
    tar -xzf apache-karaf-$KARAF_VERSION.tar.gz -C /opt; \
    rm apache-karaf-$KARAF_VERSION.tar.gz; \
    ln -s /opt/apache-karaf-$KARAF_VERSION /opt/karaf

# Expose JMX (1099 and 44444), ssh (8101), http (8181)
EXPOSE 1099 44444 8101 8181

# export KARAF_HOME
ENV KARAF_HOME /opt/karaf

VOLUME ["/opt/karaf/deploy"]

# Use the servicemix script as entrypoint
ENTRYPOINT ["/opt/karaf/bin/karaf"]