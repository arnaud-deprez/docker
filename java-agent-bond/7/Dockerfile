FROM java:7
MAINTAINER Arnaud Deprez <arnaudeprez@gmail.com>

#Install Agent Bond
ENV AGENT_BOND_VERSION 0.1.2

# Add environment setup script
ADD agent-bond-opts /bin/

RUN chmod 755 /bin/agent-bond-opts &&\
	mkdir /opt/agent-bond &&\
	wget http://central.maven.org/maven2/io/fabric8/agent-bond-agent/${AGENT_BOND_VERSION}/agent-bond-agent-${AGENT_BOND_VERSION}.jar \
	-O /opt/agent-bond/agent-bond.jar

# Print out the version
CMD ["java", "-jar", "/opt/agent-bond/agent-bond.jar", "--version"]
