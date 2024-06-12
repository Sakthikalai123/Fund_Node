# Fetching the latest node image on apline linux
FROM node:alpine

# Declaring env
ENV REACT_APP_BASE_URI "/fundnode"
ARG REACT_APP_URL

# Setting up the work directory
WORKDIR /fundintegrate-ui


# Installing dependencies
COPY ./package.json ./

# Copying all the files in our project
COPY . .
RUN npm install --force && npm install -g serve

# Building our application
RUN npm run build

EXPOSE 3000
CMD ["serve","-s","build"]
