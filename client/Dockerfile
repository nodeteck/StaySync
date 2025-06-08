# Development stage
FROM node:18-alpine AS development

WORKDIR /app

# Copy package files first for better caching
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port and start the app
EXPOSE 3000
CMD ["npm", "run", "dev"]