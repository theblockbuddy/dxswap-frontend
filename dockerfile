# Multi-stage build for the builder stage
FROM node:20

WORKDIR /app

# Copy only the necessary files to install dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN yarn


# Copy the rest of the application code
COPY . .

# build
RUN yarn build

# Expose the required port
EXPOSE 3000

# Command to run the application
CMD ["yarn","start"]
