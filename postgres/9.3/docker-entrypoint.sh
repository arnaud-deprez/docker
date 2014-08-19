#!/bin/bash
if [ "$1" = 'postgres' ]; then
	echo "in postgres"
	/usr/lib/postgresql/$PG_VERSION/bin/postgres -D /var/lib/postgresql/$PG_VERSION/main -c config_file=/etc/postgresql/$PG_VERSION/main/postgresql.conf
	echo "end of postgres"
fi

#exec "$@"