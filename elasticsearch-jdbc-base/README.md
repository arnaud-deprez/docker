#elasticsearch-jdbc

The Java Database Connection (JDBC) importer allows to fetch data from JDBC sources for indexing into Elasticsearch.
The JDBC importer was designed for tabular data. **If you have tables with many joins, the JDBC importer is limited in the way to reconstruct deeply nested objects to JSON and process object semantics like object identity**.
More information [here](https://github.com/jprante/elasticsearch-jdbc)

##Information about this image

This image is based on java:8-jre and should be use as a base image for your use case.
Indeed, it doesn't have any jdbc driver or configuration for [elasticsearch-jdbc](https://github.com/jprante/elasticsearch-jdbc)
So it's up to you to add to your needs.

##Example

First create a new Dockerfile:

```docker
FROM arnaudeprez/elasticsearch-jdbc-base:2

#Add jdbc driver to /opt/elasticsearch-jdbc-$ELASTICSEARCH_JDBC_VERSION/lib/

#Add your configuration file (config.json) to /

CMD dockerize \
    -template /config.json:/tmp/config.json \
    -stdout /opt/elasticsearch-jdbc/logs/jdbc.log \
    -stdout /statefile.json \
     java \
    -cp "/opt/elasticsearch-jdbc/lib/*" \
    -Dlog4j.configurationFile=/opt/elasticsearch-jdbc/bin/log4j2.xml \
    org.xbib.tools.Runner \
    org.xbib.tools.JDBCImporter \
    /tmp/config.json
```

An example of a configuration file is available [here](https://github.com/jprante/elasticsearch-jdbc/blob/master/docker-example/config.json)

Then build this image.

```sh
docker build -t my-elasticsearch-jdbc .
```

And run it

```sh
docker run -t --rm my-elasticsearch-jdbc
```

Don't forget to add links to elasticsearch and your database if you need it.
