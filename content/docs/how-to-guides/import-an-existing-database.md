---
title: Import data from PostgreSQL
redirectFrom:
  - /docs/cloud/tutorials
---

This topic describes how to import an existing PostgreSQL database to Neon. The instructions can also be used to migrate a database from one Neon project to another. For example, you can use the instructions to migrate a database from a Neon project created with PostgreSQL 14 to a Neon project created with PostgreSQL 15.

PostgreSQL provides several import methods. This topic shows how to use the `pg_dump` utility with connection strings and `psql`.

```bash
pg_dump <connection-string> | psql <connection-string>
```

The format for a PostgreSQL connection string is:

```bash
postgres://<user>:<password>@<hostname>:<port>/<dbname>
```

where:

- `<user>` is your PostgreSQL user.
- `<password>` is your PostgreSQL user's password.
- `<hostname>` is the hostname of the PostgreSQL instance.
- `<port>` is the port number of the PostgreSQL instance. The default port number is `5432`.
- `<dbname>` is the name of the database.

A Neon connection string has the same format with the Neon domain defined as the `hostname`, as shown:  

```bash
postgres://<user>:<password>@<project_id>.cloud.neon.tech:<port>/<dbname>
```

where:

- `<user>` is the database user.
- `<password>` is the database user's password, which is provided to you when you create a Neon project.
- `<project_id>` is the Neon project ID.
- `<port>` is the Neon port number. The default port number is `5432`.
- `<dbname>` is the name of the database. `main` is the default database created with each Neon project.

You can obtain a Neon connection string from the Neon Console project **Dashboard**, under **Connection Details**. The connection string must include your project password, which was provided when you created the Neon project. If you have misplaced your password, you can reset it or create a new user. Users and passwords are managed on the **Settings** tab in the Neon Console.

The command for importing a database from PostgreSQL to Neon appears similar to the following:

```bash
pg_dump postgres://mypguser:a1B2c3D4e5F6@<hostname>:5432/mydb | psql postgres://myneonuser:a1B2c3D4e5F6@lively-voice-123456.cloud.neon.tech:5432/main
```

The command for importing a database from one Neon project to another uses two Neon connection strings:

```bash
pg_dump postgres://myneonuser:a1B2c3D4e5F6@lively-voice-123456.cloud.neon.tech:5432/main | psql postgres://myneonuser:a1B2c3D4e5F6@floral-king-123456.cloud.neon.tech:5432/main
```

If you have multiple databases to import, each database must be imported separately.

## Data import notes

When importing a database, be aware of the following:

- If you are importing a database from an archive using `pg_dump` that is  not in plain-text format, use the `pg_restore` utility instead of `psql` to restore the database to Neon.
- Neon is not able to create databases, so you can not use `pg_dumpall` or `pg_dump` with the `-C` option.
- Because `pg_dump` dumps a single database, it does not include information about roles stored in the global `pg_authid` catalog. Also, Neon does not support creating roles using `psql`. You can only create roles (users) using the Neon Console. If you do not create roles in Neon before importing a database that has roles, you will receive "role does not exist" errors during the import operation. You can ignore this warning. It does not prevent data from being imported.
- Some PostgreSQL features that require access to the local file system are not supported by Neon. For example, tablespaces and large objects are not supported. Please take this into account when importing a database from PostgreSQL to Neon.
- In addition to databases, Neon supports importing individual tables from a standalone PostgreSQL instance. You can do this using the `COPY` command. The only requirement is that the data is transferred through a replication stream, which may affect the performance of other queries, including those unrelated to the table you are copying.

For information about the commands referred to in this topic, refer to the following topics in the PostgreSQL documentation:

- [pgdump](https://www.postgresql.org/docs/14/app-pgdump.html)
- [pg_restore](https://www.postgresql.org/docs/14/app-pgrestore.html)
- [psql](https://www.postgresql.org/docs/14/app-psql.html)
- [COPY](https://www.postgresql.org/docs/14/sql-copy.html)
