FROM arnaudeprez/java-agent-bond:8
MAINTAINER Arnaud Deprez <arnaudeprez@gmail.com>

ENV KARAF_VERSION 4.0.4

WORKDIR /opt

# Install Karaf
RUN curl -sSL http://www.eu.apache.org/dist/karaf/$KARAF_VERSION/apache-karaf-$KARAF_VERSION.tar.gz -o apache-karaf-$KARAF_VERSION.tar.gz; \
    tar -xzf apache-karaf-$KARAF_VERSION.tar.gz -C /opt; \
    rm apache-karaf-$KARAF_VERSION.tar.gz; \
    ln -s /opt/apache-karaf-$KARAF_VERSION /opt/karaf; \
	rm -rf /opt/karaf/demos /opt/karaf/deploy/README

# Expose JMX (1099 and 44444), ssh (8101), http (8181), jolokia (8778)
EXPOSE 1099 44444 8101 8181 8778

# export KARAF_HOME
ENV KARAF_HOME /opt/karaf
ADD docker-entrypoint.sh /opt/karaf/bin/docker-entrypoint.sh

# Ensure the script is executable and configure log to the standard output
RUN chmod a+x /opt/karaf/bin/docker-entrypoint.sh && \
	sed -i 's/^\(.*rootLogger.*\)out/\1stdout/' /opt/karaf/etc/org.ops4j.pax.logging.cfg

VOLUME ["/opt/karaf/deploy"]

ENTRYPOINT ["/opt/karaf/bin/docker-entrypoint.sh"]
CMD ["server"]
