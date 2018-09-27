# #  Create a new image from the base nodejs 7 image.
# FROM node:8.9
# # Create the target directory in the imahge
# RUN mkdir -p /usr/src/app
# # Set the created directory as the working directory
# WORKDIR /usr/src/app
# # Copy the package.json inside the working directory
# COPY package.json /usr/src/app
# # Install required dependencies
# RUN npm install
# # Copy the client application source files. You can use .dockerignore to exlcude files. Works just as .gitignore does.
# COPY . /usr/src/app
# # Open port 4200. This is the port that our development server uses
# EXPOSE 4200
# # Start the application. This is the same as running ng serve.
# CMD ["npm", "start"]

# base image
FROM node:8.9 as builder

# install chrome for protractor tests

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli

# add app
COPY . /usr/src/app

# run tests

# generate build
RUN npm run build

##################
### production ###
##################

# base image
FROM nginx:1.13.9-alpine

# copy artifact build from the 'build environment'
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
