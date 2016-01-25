#H2 database

(H2)[http://www.h2database.com] is a Java SQL database. Main features of H2 are: 
* Very fast, open source, JDBC API
* Embedded and server modes; in-memory databases
* Browser based Console application
* Small footprint: around 1.5 MB jar file size

This image is based on java-jolokia:8 and so it benefits directly from the jolokia JVM agent and its configuration: more information are available (here)[https://hub.docker.com/r/jolokia/java-jolokia/].
It also contains a default installation of H2 database.

To run a container instance, just use: 

```sh
docker run --name some-h2 -d arnaudeprez/h2database:1
```

This containers expose the following ports: 
* 1521: jdbc port
* 80: web console
* 8778: jolokia JVM agent

By default it uses the directory /opt/h2-data to store the databases. 
It means this container shouldn't be used alone in production, instead you should use it with a volume container with /opt/h2-data as volume.

Example:

```sh
#Create the volume
docker run --name h2-data -v /opt/h2-data busybox true
#Then run the H2 database container that uses the docker volume to store its data
docker run --name some-h2 -d --volumes-from h2-data arnaudeprez/h2database:1
```