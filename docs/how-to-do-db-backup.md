### How to make a backup of the PostgreSQL database

The backup is made by the following command:

```bash
pg_dump "postgresql://test_user:test_password@localhost:5432/test_db" > db_dump.sql
```

To make a backup without the owner and privileges, you need to use the following command:

```bash
pg_dump  --no-owner --no-privileges --clean --if-exists --quote-all-identifiers "postgresql://test_user:test_password@localhost:5432/test_db" > db_dump.sql
```

### How to restore backup to the PostgreSQL database

The restore is made by the following command:

```bash
psql "postgresql://test_user:test_password@localhost:5432/test_db" < db_dump.sql
```

Connect to the remote database

> **NOTE**: Replace `YOUR_PASSWORD`, `db.host.url.example.com`, `DB_USER`, `DB_NAME` with your actual values

```bash
# -h - host url
# -U - user name
PGPASSWORD=YOUR_PASSWORD psql -h db.host.url.example.com -U DB_USER DB_NAME
```

Restore the backup to the database (without setting the owner to postgres)

> **NOTE**: Replace `BACKUP_FILE_NAME`, `YOUR_PASSWORD`, `db.host.url.example.com`, `DB_USER`, `DB_NAME` with your actual values

```bash
grep -v '^ALTER.*OWNER TO postgres;$' BACKUP_FILE_NAME | PGPASSWORD=YOUR_PASSWORD psql -h db.host.url.example.com -U DB_USER DB_NAME
```
