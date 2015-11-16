FROM java:oracle-7
MAINTAINER Arnaud Deprez <arnaudeprez@gmail.com>

#Install Jolokia
ENV JOLOKIA_VERSION 1.3.1

# Add environment setup script
ADD jolokia_opts /bin/

RUN chmod 755 /bin/jolokia_opts &&\
	mkdir /opt/jolokia &&\
	wget http://central.maven.org/maven2/org/jolokia/jolokia-jvm/1.3.1/jolokia-jvm-1.3.1-agent.jar -O /opt/jolokia/jolokia.jar

# Print out the version
CMD ["java", "-jar", "/opt/jolokia/jolokia.jar", "--version"]