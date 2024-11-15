FROM node:20-alpine3.18

# RUN addgroup app && adduser -S -G app app

# USER app

# # Installera git
RUN apk add --no-cache git

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

# Generera Prisma Client
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "start"]