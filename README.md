## Description

It is simple library management system to manage books and borrowers.

## Main Tools

- Node.js

- Express.js

- MySQL DB

- TypeScript

- Sequelize: ORM

- Nodemailer: Sending email services

- Winston: used for system logging

## Installation

```bash
$ npm install
```

## Running the app

### development

```bash
$ npm run dev
```

### Build app

```bash
$ npm run build
```

### production mode

```bash
$ npm start
```

## Database Migration

### create new migration file

```bash
$ npx sequelize migration:generate --name migrationsFileName --migrations-path ./src/db/migrations

```

### script to run database migration

```bash
$ npx sequelize-cli db:migrate --url "mysql://username:password@host/database_name" --migrations-path "src/db/migrations"
```

## Environment Variables

PORT: require port for running app ex: 5000.

ENCRYPTION_KEY: key used for ENCRYPTION process in system "it depended on ENCRYPTION algorithm"

test ENCRYPTION_KEY ex: 0f4f6baad4efb4bb7b144e1bf5ca7066

DB_DATABASE: Database name.

DB_USERNAME: Database username.

DB_PASSWORD: Database Password.

DB_HOST: Database host.

DB_PORT: Database port.

JWT_SECRET: jwt secret key.

JWT_EXPIRE: jwt expire.

GOOGLE_USER: gmail address "used for mail services configuration".

GOOGLE_PASSWORD: password for google services "not gmail password and used for mail services configuration"
