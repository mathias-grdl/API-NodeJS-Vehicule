FROM node:22.12.0

LABEL author="Mathias"

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]