# Use the official Node.js 18.x image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package.json ./

# Install Node.js dependencies
RUN npm config set strict-ssl false
RUN npm install

# Copy the entire React app to the container's working directory
COPY . .

# Build the React app
RUN npm run build 

# Expose the port on which the React app will run (default is 3000)
EXPOSE 3000

# Start the React app when the container starts
CMD ["npm", "start"]
