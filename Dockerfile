# Step 1: Build the NestJS application with Nest CLI
FROM node:alpine as builder

WORKDIR /app

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Step 2: Run the NestJS application with MongoDB
FROM node:alpine

WORKDIR /app

COPY --from=builder /usr/local/bin/nest /usr/local/bin/nest
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

RUN npm install --only=production

# Expose port 3000 for NestJS application
EXPOSE 3000

# Start NestJS application
CMD ["npm", "run", "start:prod" ]

