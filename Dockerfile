FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Открываем порт (информативно)
EXPOSE 3000

# Команда запуска
CMD ["npm", "start"]
