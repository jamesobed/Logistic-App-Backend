#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER test WITH PASSWORD 'test';
	ALTER ROLE test WITH CREATEDB;
	SET ROLE test;
	CREATE DATABASE test;
EOSQL