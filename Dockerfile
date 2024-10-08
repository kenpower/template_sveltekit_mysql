# Dockerfile

# Use the official Node.js image as a base
FROM node:20-alpine

# Install bash Required for running the entrypoint script (waitforit.sh)
RUN apk add --no-cache bash

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
# --legacy-peer-deps is needed because some libraries are not yet migrated to svelte5
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the SvelteKit application
# RUN npm run build

# Expose the port the app runs on
EXPOSE 3000
