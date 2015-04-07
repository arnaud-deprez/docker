FROM dockerfile/java:oracle-java7
MAINTAINER Arnaud Deprez (arnaudeprez@gmail.com)

# export JAVA_HOME environment variable
ENV JAVA_HOME /usr/lib/jvm/java-7-oracle
ENV JAVA_DEBUG_PORT 5005
ENV JAVA_OPTS="-Xms64m -Xmx512m -XX:MaxPermSize=256m -Djava.net.preferIPv4Stack=true -Dorg.jboss.resolver.warning=true -Dsun.rmi.dgc.client.gcInterval=3600000 -Dsun.rmi.dgc.server.gcInterval=3600000"
ENV JAVA_OPTS="$JAVA_OPTS -Djboss.modules.system.pkgs=$JBOSS_MODULES_SYSTEM_PKGS -Djava.awt.headless=true"
ENV JAVA_OPTS="$JAVA_OPTS -Djboss.server.default.config=standalone.xml"

# Install JBoss-7.1.1.Final
RUN wget http://download.jboss.org/jbossas/7.1/jboss-as-7.1.1.Final/jboss-as-7.1.1.Final.tar.gz; \
    tar -xzf jboss-as-7.1.1.Final.tar.gz -C /opt; \
    rm jboss-as-7.1.1.Final.tar.gz; \
    ln -s /opt/jboss-as-7.1.1.Final /opt/jboss-as

# Expose port for remote, debug, HornetQ, http, https, management (osgi, http, https)
EXPOSE 4447 5005 5445 5455 8080 8443 9999 9990 9443

ADD jboss-entrypoint.sh /jboss-entrypoint.sh
RUN chmod +x /jboss-entrypoint.sh

ENTRYPOINT ["/jboss-entrypoint.sh"]
CMD ["-b", "0.0.0.0"]