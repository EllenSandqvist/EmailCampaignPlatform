# Email Campaign Platform

## Create a database locally on pgadmin

Create a user with: name, username, password in your database

## Create a .env-file in the root dir and fill out the data

PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/databasename
SESSION_SECRET=mysecret

## Install dependencies

npm install

## Prisma

npx prisma init --datasource-provider postgresql
npx prisma migrate dev --name dev
npx prisma generate

## API endpoints ## Method ## Request Body

http://localhost:3000/login POST {"username": "<username>", "password": "<password>" }
http://localhost:3000/logout POST {"username": "<username>"}
