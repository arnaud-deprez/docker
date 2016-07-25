#Apache Karaf

[Apache Karaf](http://karaf.apache.org/) is a modern and polymorphic container.
It's a lightweight, powerful, and enterprise ready container powered by OSGi.
The container is able to host different kind of applications, OSGi or non OSGi.

Currently I support the 3 last major versions (2, 3, 4).

Each image is based on java-jolokia:8 and so it benefits directly from the jolokia JVM agent and its configuration: more information are available [here](https://hub.docker.com/r/jolokia/java-jolokia/).
It also contains a default installation of [Apache Karaf](http://karaf.apache.org/) (2, 3, 4).

To run a container instance, just use: 

```sh
docker run --name some-karaf -d arnaudeprez/karaf:4
```

Once the container is started, you can connect to the karaf admin console: 

```sh
docker exec -ti some-karaf ssh karaf@localhost -p 8101
```

By default the user/password is karaf/karaf but you can change it by modifying /opt/karaf/etc/users.properties.

This containers expose the following ports: 
* 1099 44444: jmx 
* 8101: karaf console 
* 8181: http port 
* 8778: jolokia

It also expose volumes: 
* /opt/karaf/deploy: to allow hot deployments
