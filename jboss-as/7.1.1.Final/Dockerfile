FROM dockerfile/java:oracle-java7
MAINTAINER Arnaud Deprez (arnaudeprez@gmail.com)

# export JAVA_HOME environment variable
ENV JAVA_HOME /usr/lib/jvm/java-7-oracle

# Install JBoss-7.1.1.Final
RUN wget http://download.jboss.org/jbossas/7.1/jboss-as-7.1.1.Final/jboss-as-7.1.1.Final.tar.gz; \
    tar -xzf jboss-as-7.1.1.Final.tar.gz -C /opt; \
    rm jboss-as-7.1.1.Final.tar.gz; \
    ln -s /opt/jboss-as-7.1.1.Final /opt/jboss-as

# Expose port for remote, HornetQ, http, https, management (osgi, http, https)
EXPOSE 4447 5445 5455 8080 8443 9999 9990 9443

VOLUME ["/opt/jboss-as/standalone", "/opt/jboss-as/domain"]

ENTRYPOINT ["/opt/jboss-as/bin/standalone.sh"]
CMD ["-b", "0.0.0.0"]