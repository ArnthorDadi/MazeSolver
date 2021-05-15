# First we want to build on an image the includes the environment we need to build and run our code, we can use 'node:13.12.0-alpine':
FROM node:13.12.0-alpine


# Now set the working directory to /app:
WORKDIR /app

# Next we need to install all app dependencies,
# First copy both package.json and package-lock.json into the current working directory:
COPY package.json /app
COPY package-lock.json /app
# Then run npm install
RUN npm install

# Now we need the rest of our application code, copy your entire folder into the image working directory:
COPY . /app

# Lastly we need to run the application when the container starts, set the command as npm start:
ENTRYPOINT ["npm", "start"]