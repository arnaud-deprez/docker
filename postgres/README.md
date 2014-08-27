# Postgres

The docker image is available on [DockerHub](https://registry.hub.docker.com/u/arnaudeprez/postgres/).

To run your postgres instance, just use (once you have installed docker <https://docs.docker.com/>) : 

    sudo docker run --name <container_name> -p 5432:5432 -d arnaudeprez/postgres:$PG_VERSION
    
*where $PG_VERSION is the version of postgres you choose to run.*
    
This will run an instance of postgres with a default database **postgres** and the default admin user **postgres** with password **postgres**