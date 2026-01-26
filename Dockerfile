FROM nginx:alpine

# Copy website
COPY . /usr/share/nginx/html

# Copy nginx template
COPY default.conf.template /etc/nginx/templates/default.conf.template

# Cloud Run provides PORT
ENV PORT=8080

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]