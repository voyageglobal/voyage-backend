### How to restore backup to the PostgreSQL database

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
