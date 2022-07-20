FROM node:16.16.0

WORKDIR /usr/app

COPY package.json .
COPY src/ src/
COPY public/ public/
RUN npm install --silent
COPY node_modules/react-scripts/config/webpackDevServer.config.js node_modules/react-scripts/config/webpackDevServer.config.js
RUN npm run build --prod --silent

RUN apt-get update && apt-get install -y nginx
COPY nginx.conf /etc/nginx/sites-enabled/nginx.conf
RUN rm /etc/nginx/sites-enabled/default
RUN ln -s /etc/nginx/sites-enabled/nginx.conf /etc/nginx/sites-available/nginx.conf
RUN mkdir -p /usr/share/nginx/html
RUN cp -r build/* /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
