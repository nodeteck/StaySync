# Development stage
FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Create .next directory and set permissions
RUN mkdir -p .next && chown -R node:node /app
USER node

# Expose port
EXPOSE 3000

# Start the development server with proper host binding
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0", "--port", "3000"]