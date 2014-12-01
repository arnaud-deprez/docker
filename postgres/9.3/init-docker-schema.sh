#!/bin/bash

# Update configuration to allow remote connection
# Allow authentication based on user password
# Allow prepared transactions to enable XA transactions
# Disable ssl configuration
echo "******UPDATE CONFIGURATION******"
#sed -ri "s/^(host all all 0.0.0.0\/0) trust/\1 md5/" "$PGDATA"/pg_hba.conf
sed -ri "s/^#(max_prepared_transactions\s*=\s*)\S+/\120/" "$PGDATA"/postgresql.conf
sed -e "s/^ssl\s*=\s*true/ssl = false/" -i "$PGDATA"/postgresql.conf
echo ""
echo "******CONFIGURATION UPDATED******"

echo "******CREATING DOCKER DATABASE******"
gosu postgres postgres --single <<- EOSQL
   CREATE DATABASE "docker";
   CREATE USER "docker";
   ALTER USER "docker" WITH ENCRYPTED PASSWORD 'docker';
   GRANT ALL PRIVILEGES ON DATABASE "docker" TO "docker";
EOSQL
echo ""
echo "******DOCKER DATABASE CREATED******"