#!/bin/bash
set -e

if [ "$1" == "postgres" ]; then
	exec gosu postgres "$@"
fi

exec "$@"