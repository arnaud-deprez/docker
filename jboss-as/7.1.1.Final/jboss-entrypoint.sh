#!/bin/bash
echo "JAVA_DEBUG=$JAVA_DEBUG, JAVA_DEBUG_PORT=$JAVA_DEBUG_PORT"

if [ "x$JAVA_DEBUG" != "x" ]; then
    JAVA_OPTS="$JAVA_OPTS -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=$JAVA_DEBUG_PORT"
fi

/opt/jboss-as/bin/standalone.sh "$@"