# Use Node.js version 14 as the base image
FROM node:14

# Install MongoDB
RUN apt-get update && apt-get install -y mongodb

# Create and set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Install dependencies
RUN npm run build

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000 for the application to listen on
EXPOSE 3000

# Start MongoDB and the application
CMD ["mongod", "&", "npm", "run start:prod"]
