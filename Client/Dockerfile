FROM node:alpine AS build
WORKDIR /src
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
RUN ls
RUN pwd

FROM nginx:alpine
COPY --from=build /src/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]
