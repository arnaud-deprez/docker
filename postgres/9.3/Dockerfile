#!/bin/sh
FROM ubuntu:14.04.1
MAINTAINER Arnaud Deprez (arnaudeprez@gmail.com)

# Enable universe
RUN sed 's/main$/main universe/' -i /etc/apt/sources.list
RUN apt-get update
# RUN apt-get upgrade -y

# grab gosu for easy step-down from root
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/* \
	&& curl -o /usr/local/bin/gosu -SL 'https://github.com/tianon/gosu/releases/download/1.1/gosu' \
	&& chmod +x /usr/local/bin/gosu \
	&& apt-get purge -y --auto-remove curl

# Configure the postgres version
ENV PG_VERSION 9.3

# make the "en_US.UTF-8" locale so postgres will be utf-8 enabled by default
RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
	&& localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8

# add our user and group first to make sure their IDs get assigned consistently, regardless of whatever dependencies get added
RUN groupadd -r postgres && useradd -r -g postgres postgres

# Add the PostgreSQL PGP key to verify their Debian packages.
# It should be the same key as https://www.postgresql.org/media/keys/ACCC4CF8.asc
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8

# Add PostgreSQL's repository. It contains the most recent stable release
#     of PostgreSQL, ``$PG_VERSION``.
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main" > /etc/apt/sources.list.d/pgdg.list

# Update the Ubuntu and PostgreSQL repository indexes
RUN apt-get update

# Install ``python-software-properties``, ``software-properties-common`` and PostgreSQL $PG_VERSION
#  There are some warnings (in red) that show up during the build. You can hide
#  them by prefixing each apt-get statement with DEBIAN_FRONTEND=noninteractive
RUN apt-get -y -q install python-software-properties software-properties-common
RUN apt-get -y -q install postgresql-$PG_VERSION postgresql-client-$PG_VERSION postgresql-contrib-$PG_VERSION

# Note: The official Debian and Ubuntu images automatically ``apt-get clean``
# after each ``apt-get``

# Adjust PostgreSQL configuration so that remote connections to the
# database are possible.
RUN cp /etc/postgresql/$PG_VERSION/main/pg_hba.conf /etc/postgresql/$PG_VERSION/main/pg_hba.conf.orig &&\
	echo "host all all 0.0.0.0/0 md5" >> /etc/postgresql/$PG_VERSION/main/pg_hba.conf

# And add ``listen_addresses`` to ``/etc/postgresql/$PG_VERSION/main/postgresql.conf``
# And add ``max_prepared_transactions`` to ``/etc/postgresql/$PG_VERSION/main/postgresql.conf`` to enable XA transaction
# And disable ssl configuration
RUN cp /etc/postgresql/$PG_VERSION/main/postgresql.conf /etc/postgresql/$PG_VERSION/main/postgresql.conf.orig &&\
	echo "listen_addresses='*'" >> /etc/postgresql/$PG_VERSION/main/postgresql.conf &&\
	echo "max_prepared_transactions = 20" >> /etc/postgresql/$PG_VERSION/main/postgresql.conf &&\
	sed -e "s/^ssl\s*=\s*true/ssl = false/" -i /etc/postgresql/$PG_VERSION/main/postgresql.conf

# Alter the PostgreSQL role ``postgres`` with ``postgres`` as the superuser password
RUN gosu postgres /etc/init.d/postgresql start &&\
	gosu postgres psql --command "ALTER USER postgres WITH SUPERUSER ENCRYPTED PASSWORD 'postgres';"

# Expose the PostgreSQL port
EXPOSE 5432

# Change directory owner to allow backup of config, logs and databases
RUN chown -R postgres:postgres /etc/postgresql &&\
	chown -R postgres:postgres /var/log/postgresql &&\
	chown -R postgres:postgres /var/lib/postgresql

# Configure entrypoint for docker images and configure PATH
ENV PATH /usr/lib/postgresql/$PG_VERSION/bin:$PATH
ADD docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod 755 /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

# Set the default command to run when starting the container
CMD ["postgres", "-D", "/var/lib/postgresql/9.3/main", "-c", "config_file=/etc/postgresql/9.3/main/postgresql.conf"]