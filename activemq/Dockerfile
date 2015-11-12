FROM java:8
MAINTAINER Arnaud Deprez <arnaudeprez@gmail.com>

ENV ACTIVEMQ_VERSION 5.12.1
ENV ACTIVEMQ apache-activemq-$ACTIVEMQ_VERSION
ENV ACTIVEMQ_HOME /opt/activemq

RUN curl -O http://www.eu.apache.org/dist/activemq/$ACTIVEMQ_VERSION/$ACTIVEMQ-bin.tar.gz && \
    mkdir -p /opt && \
    tar -xf $ACTIVEMQ-bin.tar.gz -C /opt/ && \
    rm $ACTIVEMQ-bin.tar.gz && \
    ln -s /opt/$ACTIVEMQ $ACTIVEMQ_HOME

#Remove unneeded files
RUN rm -rf /opt/apache-activemq/examples && \
    rm -rf /opt/apache-activemq/docs && \
    rm -rf /opt/apache-activemq/webapps-demo

ADD ./activemq.xml $ACTIVEMQ_HOME/conf/activemq.xml

# stomp, ws, tcp, nio, amqp, mqtt, http
EXPOSE 61613 61614 61615 61616 5672 1883 8161

CMD ["/opt/activemq/bin/activemq", "console"]