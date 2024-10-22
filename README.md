## Description

This is repo for Quiz purpose only.

This repo contain Backend functions to perform CRUD of Ticket.

## Project setup

1. Install dependencies

```bash
$ npm install
```

2. Create new mysql database on your local (db name = `my_tickets_db`) and add these env to your local.

```bash
APP_NAME=
DB_DATABASE=my_tickets_db
DB_HOST=localhost
DB_PASSWORD=
DB_PORT=3306
DB_USERNAME=
JWT_EXPIRED_IN=30m
JWT_SECRET=
NODE_ENV=development
PORT=3000
```

3. Run command to run migrations

```bash
$ npm run typeorm:migration:run
```

4. Run the project

```bash
# watch mode
$ npm run start:dev
```

5. I've also included the postman collection for your testing purpose. You can download and import to your postman.
   Filename `Sitemate Ticket Test.postman_collection.json`
