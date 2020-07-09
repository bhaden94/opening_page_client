# # What image do you want to start building on?
# FROM node:latest

# # Tell your container where your app's source code will live
# WORKDIR /src/app

# # What source code do you want to copy, and where to put it?
# COPY . /src/app

# # Does your app have any dependencies that should be installed?
# RUN npm install
 
# # Uses port which is used by the actual application
# EXPOSE 3000
 
# # Finally runs the application
# CMD [ "npm", "start" ]

FROM node:latest
WORKDIR /app/
COPY ./tsconfig.json ./
COPY ./webpack.config.ts ./
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci --ignore-scripts
COPY ./src ./src
RUN npm run build

FROM nginx:stable
ENV PORT=80
COPY ./nginx.conf /template.conf
COPY ./envConfig.sh .
COPY --from=0 /app/build/ /usr/share/nginx/html
ENTRYPOINT ["/envConfig.sh"]
CMD ["nginx", "-g", "daemon off;"]