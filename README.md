## Docker deployment

```bash
# Build image and start network
# ports 27017 and 3000 should be free

$ docker-compose up -d

# Stop docker network
$ docker-compose stop
```

## Dev Server

```bash
# Install mongodb as pre-req
# Update db path in file -> typeorm.config.ts
```
## Installation

```bash
$ npm install
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

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
