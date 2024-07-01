# Voyage API

## Description

The backend for Voyage application. 

Voyage is a service that allows users to plan their trips and look for relevant knowledge about cities.

## Documentation
Useful documentation can be found in the [docs](./docs) folder.

### Application stack
- NodeJS
- NestJS
- TypeScript
- Prisma
- PostgreSQL
- Amazon EC2
- Amazon S3
- Amazon Cognito
- Docker
- Jest
- Swagger
- GitHub Actions

## Installation

```bash
$ npm install
```

## Environment variables
```bash
# Create a .env file in the root of the project and add the environment variables
# The .env.example file contains the list of required environment
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger

The swagger UI is available at the following endpoint: `/api/docs`


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## DB

```bash
# if app is running locally, make sure to have a local postgres database running

# If you run the app for the first time, you need to generate the prisma client and migrate the database
# Run the following command to generate the prisma client
$ npm run prisma:generate

# Run the following command to migrate the database locally
$ npm run prisma:migrate:dev
```

### Connection to DB from PGAdmin
To connect to the local database in Docker from PGAdmin, use the following host and port:
```bash
host = host.docker.internal
port = DB_PORT_OUT
```

### Connection to DB from app placed on local machine
To connect to the local database in Docker from the app placed on the local machine, use the following host and port:
```bash
host = localhost
port = DB_PORT_OUT
```

## Local Development

```bash
# To kill a process running on a port use the following command
$ sudo npx kill-port 3000
# OR on Mac
$ sudo lsof -i tcp:3000
$ sudo kill -9 PID
# OR on Windows
$ netstat -ano | findstr :3000
$ tskill PID
```

```bash
# To generate a new CRUD module, run the following command
$ nest g res modules/MODULE_NAME
```

### Seed data
Cities, countries data is taken from the [countries-states-cities-database](https://github.com/dr5hn/countries-states-cities-database)