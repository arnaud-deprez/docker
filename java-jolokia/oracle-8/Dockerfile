FROM java:oracle-8
MAINTAINER Arnaud Deprez <arnaudeprez@gmail.com>

#Install Jolokia
ENV JOLOKIA_VERSION 1.3.3

# Add environment setup script
ADD jolokia_opts /bin/

RUN chmod 755 /bin/jolokia_opts &&\
	mkdir /opt/jolokia &&\
	curl -sSL http://central.maven.org/maven2/org/jolokia/jolokia-jvm/${JOLOKIA_VERSION}/jolokia-jvm-${JOLOKIA_VERSION}-agent.jar -o /opt/jolokia/jolokia.jar

# Print out the version
CMD ["java", "-jar", "/opt/jolokia/jolokia.jar", "--version"]
