#!/bin/bash
set -e

if [ "$1" == "postgres" ]; then
    chown -R postgres:postgres /var/lib/postgresql
	exec gosu postgres "$@"
fi

exec "$@"