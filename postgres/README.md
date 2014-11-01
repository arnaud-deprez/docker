# Postgres

This image inherit from the postgres official image.
It shows an example of how to create another database with another user by using the single mode.
More information available [here](http://stackoverflow.com/questions/26598738/how-to-create-user-database-in-script-for-docker-postgres)

The official documentation is available [here](https://registry.hub.docker.com/_/postgres/)

To run an container instance, just use: 

    docker run --name some-postgres -d postgres    

It will expose the default port "5432" and the data volume "/var/lib/postgresql/data"