FROM dockerfile/java:oracle-java7
MAINTAINER Arnaud Deprez (arnaudeprez@gmail.com)

# export JAVA_HOME environment variable
ENV JAVA_HOME /usr/lib/jvm/java-7-oracle
ENV JAVA_OPTS

# Install JBoss-7.1.1.Final
RUN wget http://download.jboss.org/jbossas/7.1/jboss-as-7.1.1.Final/jboss-as-7.1.1.Final.tar.gz; \
    tar -xzf apache-servicemix-4.5.3.tar.gz -C /opt; \
    rm jboss-as-7.1.1.Final.tar.gz; \
    ln -s /opt/jboss-as-7.1.1.Final /opt/jboss-as