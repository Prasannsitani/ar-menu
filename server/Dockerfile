# Base Image
FROM node:16

# Seeting up env as production
ENV NODE_ENV=production

#Getting System Ready to install dependencies
RUN apt-get clean \
    && apt-get -y update
    
# Installing nginx
RUN apt-get -y install nginx \
    && apt-get -y install python3-dev \
    && apt-get -y install build-essential

# Creating symbolic link for access and error log from nginx
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log


# Making /app dir as working dir
WORKDIR /app

# Adding complete files and dirs in app dir in container
ADD . /app/

# Refer https://raw.githubusercontent.com/devtron-labs/devtron/main/sample-docker-templates/node/nginx.default for sample nginx.default
COPY nginx.default /etc/nginx/sites-available/default

# Installing dependencies
RUN yarn install --production
RUN yarn global add pm2

# Starting Server
CMD ["sh", "-c", "service nginx start ; pm2-runtime server.js -i 0"]