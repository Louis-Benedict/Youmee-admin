# Base on offical NGINX Alpine image
FROM nginx:alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy config files
# *.conf files in conf.d/ dir get included in main config
COPY ./default.conf /etc/nginx/conf.d/
COPY ./proxy_params /etc/nginx/proxy_params

EXPOSE 443
EXPOSE 80

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]