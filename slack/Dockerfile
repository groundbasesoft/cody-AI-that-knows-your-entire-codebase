# Choose the latest LTS (Long Term Support) version of node as our base image
FROM node:lts@sha256:445acd9b2ef7e9de665424053bf95652e0b8995ef36500557d48faf29300170a

ARG PROJECT_ROOT="."

# Create a directory for our application
WORKDIR /app

# Copy only the build artifact and package.json into our app directory
COPY ${PROJECT_ROOT}/dist .
COPY ${PROJECT_ROOT}/package .

# Install only production dependencies
RUN npm install --omit=dev --silent

# The application's default port is picked from the environment
EXPOSE $PORT

# Start the application
CMD [ "node", "app.js" ]
