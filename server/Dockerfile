# Base Image
FROM node:16

# Setting up env as production
ENV NODE_ENV=production
ENV DB_URL=mongodb+srv://admin:admin@ar-menu.jvvucuy.mongodb.net/test
ENV S3_BUCKET_ENDPOINT=https://nyc3.digitaloceanspaces.com
ENV S3_BUCKET_NAME=purnabramha-public-assets
ENV S3_ACCESS_KEY=DO00XG8T87H37QGRK7H7
ENV S3_SECRET_KEY=JrCHRlCq+5i7sPhxT7iaAAPnWjftFdcNexDuXeRX3R4
ENV MAX_360_IMAGES_COUNT=24

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

# Copying nginx to correct location
COPY nginx.default /etc/nginx/sites-available/default

# Installing dependencies
RUN yarn install --production
RUN yarn global add pm2

# Starting Server
CMD ["sh", "-c", "service nginx start; pm2-runtime server.js -i 0"]