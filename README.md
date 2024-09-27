# Email Campaign Platform

## Create a database locally on pgadmin

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

## API endpoints Method Request Body

http://localhost:3000/register POST {"username": "<username>", "password": "<password>", "email": "<email>" }

http://localhost:3000/login POST {"email": "<email>", "password": "<password>" }
http://localhost:3000/logout POST {"email": "<email>"}

http://localhost:3000/campaigns GET  
http://localhost:3000/campaigns/:id GET  
http://localhost:3000/campaigns POST {"campaignName": "<campaignName>", "companyName": "<companyName>", "companyDescription": "<companyDescription>", "productDescription": "<productDescription>","targetAudience": "<targetAudience>"}

http://localhost:3000/campaigns/:campaignId/generate-email POST {"subject": "<subject>", "content": "<content>", "recipients": "<recipients>"}
http://localhost:3000/campaigns/:campaignId/generated-emails GET  
http://localhost:3000/campaigns/:campaignId/generated-emails/:generatedEmailId" GET
