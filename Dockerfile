FROM cypress/included:13.6.2

# Set working directory
WORKDIR /e2e

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install --unsafe-perm

# Copy project files
COPY cypress.config.js ./
COPY cypress ./cypress

# Set command to run tests
CMD ["npx", "cypress", "run", "--browser", "chrome", "--headless"]
