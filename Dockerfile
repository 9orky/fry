FROM node:10-alpine as builder

WORKDIR /srv/fry

ENV PATH /srv/fry/node_modules/.bin:$PATH

ADD ./ ./

RUN npm install --silent
RUN npm run build

FROM nginx:1.15

ARG VHOST_FILENAME="fry.conf"
ARG DOMAIN

RUN mkdir -p /etc/nginx/sites-available
RUN mkdir -p /etc/nginx/sites-enabled

COPY --from=builder /srv/fry/build/ /srv/fry
COPY ./etc/nginx.conf /etc/nginx/nginx.conf
COPY ./etc/vhost.conf /etc/nginx/sites-available/${VHOST_FILENAME}

RUN sed -i "s/server_name.*/server_name ${DOMAIN};/g" /etc/nginx/sites-available/${VHOST_FILENAME}
RUN sed -i "/root.*/root ${NGINX_ROOT_FOLDER};/g" /etc/nginx/sites-available/${VHOST_FILENAME}

RUN ln -s /etc/nginx/sites-available/${VHOST_FILENAME} /etc/nginx/sites-enabled/${VHOST_FILENAME}

WORKDIR /etc/nginx

CMD ["nginx", "-g", "daemon off;"]