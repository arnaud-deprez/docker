FROM ubuntu:14.04.1

MAINTAINER Arnaud Deprez (arnaudeprez@gmail.com)

ENV PG_VERSION 9.3

# Add the PostgreSQL PGP key to verify their Debian packages.
# It should be the same key as https://www.postgresql.org/media/keys/ACCC4CF8.asc
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8

# Add PostgreSQL's repository. It contains the most recent stable release
#     of PostgreSQL, ``$PG_VERSION``.
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" > /etc/apt/sources.list.d/pgdg.list

# Update the Ubuntu and PostgreSQL repository indexes
RUN apt-get update

# Install ``python-software-properties``, ``software-properties-common`` and PostgreSQL $PG_VERSION
#  There are some warnings (in red) that show up during the build. You can hide
#  them by prefixing each apt-get statement with DEBIAN_FRONTEND=noninteractive
RUN apt-get -y -q install python-software-properties software-properties-common
RUN apt-get -y -q install postgresql-$PG_VERSION postgresql-client-$PG_VERSION postgresql-contrib-$PG_VERSION
RUN rm -rf /var/lib/apt/lists/*

# Note: The official Debian and Ubuntu images automatically ``apt-get clean``
# after each ``apt-get``

# Run the rest of the commands as the ``postgres`` user created by the ``postgres-$PG_VERSION`` package when it was ``apt-get installed``
USER postgres

# Create a PostgreSQL role named ``docker`` with ``docker`` as the password and
# then create a database `docker` owned by the ``docker`` role.
# Note: here we use ``&&\`` to run commands one after the other - the ``\``
#       allows the RUN command to span multiple lines.
RUN /etc/init.d/postgresql start
# RUN    /etc/init.d/postgresql start &&\
#    psql --command "CREATE USER docker WITH SUPERUSER PASSWORD 'docker';" &&\
#    createdb -O docker docker

# Adjust PostgreSQL configuration so that remote connections to the
# database are possible. 
RUN cp /etc/postgresql/$PG_VERSION/main/pg_hba.conf /etc/postgresql/$PG_VERSION/main/pg_hba.conf.orig &&\
	echo "host all all 0.0.0.0/0 md5" >> /etc/postgresql/$PG_VERSION/main/pg_hba.conf

# And add ``listen_addresses`` to ``/etc/postgresql/$PG_VERSION/main/postgresql.conf``
# And add ``max_prepared_transactions`` to ``/etc/postgresql/$PG_VERSION/main/postgresql.conf`` to enable XA transaction
RUN cp /etc/postgresql/$PG_VERSION/main/postgresql.conf /etc/postgresql/$PG_VERSION/main/postgresql.conf.orig &&\
	echo "listen_addresses='*'" >> /etc/postgresql/$PG_VERSION/main/postgresql.conf &&\
	echo "max_prepared_transactions = 20" >> /etc/postgresql/$PG_VERSION/main/postgresql.conf

# Expose the PostgreSQL port
EXPOSE 5432

# Add VOLUMEs to allow backup of config, logs and databases
VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

#ADD ./docker-entrypoint.sh /
#ENTRYPOINT ["/docker-entrypoint.sh"]

# Set the default command to run when starting the container
CMD ["/usr/lib/postgresql/9.3/bin/postgres", "-D", "/var/lib/postgresql/9.3/main", "-c", "config_file=/etc/postgresql/9.3/main/postgresql.conf"]