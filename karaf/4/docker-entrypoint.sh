#!/bin/sh
export KARAF_OPTS="$KARAF_OPTS $(jolokia_opts)"

exec /opt/apache-karaf-$KARAF_VERSION/bin/karaf "$@"
