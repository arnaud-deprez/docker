# Docker image repository

## Images

This repository contains my custom docker images.

Some are publics and available as automated build in [dockerhub](https://hub.docker.com/u/arnaudeprez):

* [Java base image with Agent Bond](java-agent-bond/README.md)
* [Apache ActiveMQ](activemq/README.md)
* [Apache Karaf](karaf/README.md)
* [Elasticsearch JDBC importer](elasticsearch-jdbc-base/README.md)
* [H2 database](h2database/README.md)

Some other aren't public due to legal restrictions:

* [Java Oracle base image](java/README.md)
* [Java Oracle base image with Jolokia agent](java-jolokia/README.md)
* [Java Oracle base image with Agent Bond](java-jolokia/README.md)

## Template engine

This template engine is based on what (Roland Huß)[https://github.com/rhuss] have done for [jolokia](https://github.com/rhuss/docker-java-jolokia)
For generating the images a simple node.js based templating script is used.

### Initial setup

First you need to install [npm](https://www.npmjs.com) to install the required dependencies.
Then, in the project folder, run the folowing script

```sh
npm install
```

It will install all the required dependencies.
Then you'll be able to generate the final automated build Dockerfile from the configuration and the template, by running:

```sh
node build.js
```

### Build system

In the base directory of each image, you'll find:

* One or many *.template files
* One config.yml used to customize the file generation

Templates use the [doT](http://olado.github.io/doT/index.html) templating library.

### Configuration file

The configuration file must be called config.yml and be placed at the root of each image directory.
You can find a complete example [here](karaf/config.yml)

#### Description

* tags: is the list of the generated directories. Each directory corresponds to a docker tag in the automated build system.
* config: define the config for each image
	* default: is the default config for each image
	* \<tag\>: is the specific config for this specific docker tag

If you need to change the version or add a new tag, all you need to do is to update the corresponding config.yml of your image.
Then commit your changes and push it!
