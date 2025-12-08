const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todos';

// Подключение MongoDB — но НЕ в тестах
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('Connected to MongoDB at ' + MONGO_URI))
        .catch(err => console.error('Could not connect to MongoDB', err));
}

// Роуты
const routes = require('./routes');
app.use('/', routes);

// Запуск сервера
if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = { app, mongoose };
