#!/usr/bin/env bash
set -euo pipefail

docker exec zitadel-postgres-1 psql -U postgres -d zitadel -Atc \
  "select schemaname || '.' || tablename from pg_tables where schemaname not in ('pg_catalog','information_schema') and tablename ilike '%user%' order by 1;"

echo "--- auth.users3 ---"
docker exec zitadel-postgres-1 psql -U postgres -d zitadel -c \
  "select * from auth.users3 limit 5;" || true

echo "--- projections.users14 ---"
docker exec zitadel-postgres-1 psql -U postgres -d zitadel -c \
  "select * from projections.users14 limit 5;" || true
