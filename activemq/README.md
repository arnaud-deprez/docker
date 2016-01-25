#Apache ActiveMQ

[Apache ActiveMQ](http://activemq.apache.org) is the most popular and powerful open source messaging and Integration Patterns server.

This image inherits from java:8 and contain a default ActiveMQ installation but I replaced the default old TCP connector with the new NIO implementation for better performance (it's non blocking).

To run a container instance, just use: 

```sh
docker run --name some-activemq -d arnaudeprez/activemq:5
```

This containers expose the following ports: 
* 61613: stomp
* 61614: ws 
* 61616: nio (tcp) 
* 5672: amqp
* 1883: mqtt
* 8161: http (web console)