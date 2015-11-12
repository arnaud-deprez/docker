FROM jolokia/java-jolokia:8
MAINTAINER Arnaud Deprez (arnaudeprez@gmail.com)

ENV KARAF_VERSION 3.0.5

WORKDIR /opt

# Install Servicemix
RUN wget http://www.eu.apache.org/dist/karaf/$KARAF_VERSION/apache-karaf-$KARAF_VERSION.tar.gz; \
    tar -xzf apache-karaf-$KARAF_VERSION.tar.gz -C /opt; \
    rm apache-karaf-$KARAF_VERSION.tar.gz; \
    ln -s /opt/apache-karaf-$KARAF_VERSION /opt/karaf

# Remove unneeded files
RUN rm -rf /opt/karaf/demos

# Expose JMX (1099 and 44444), ssh (8101), http (8181), jolokia (8778)
EXPOSE 1099 44444 8101 8181 8778

# export KARAF_HOME
ENV KARAF_HOME /opt/karaf
ADD karaf-run.sh /opt/karaf/bin/karaf-run.sh

VOLUME ["/opt/karaf/deploy"]

ENTRYPOINT ["/opt/karaf/bin/karaf-run.sh"]