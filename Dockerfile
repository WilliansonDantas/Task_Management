FROM node:16

WORKDIR /app

COPY task-management-api/package*.json ./

RUN npm install

COPY task-management-api/ .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
