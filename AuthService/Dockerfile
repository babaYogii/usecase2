# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose port 4000 on which the Express app will listen
EXPOSE 4001

# Start the Express app when the container starts
CMD ["node", "server.js"]
