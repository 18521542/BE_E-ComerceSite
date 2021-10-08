FROM node:12

WORKDIR /app

COPY package.json . 

RUN npm install 

COPY . .

VOLUME [ "/app/node_modules" ]

CMD ["npm", "start"]