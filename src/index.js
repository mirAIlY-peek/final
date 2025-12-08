const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// Middleware для парсинга JSON
app.use(cors());
app.use(express.json());

require('dotenv').config();

// Конфигурация через переменные окружения (важно для Docker/K8s)
const PORT = process.env.PORT || 3000;
// По дефолту подключаемся к localhost, но в Docker это будет имя сервиса
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todos';

// Подключение к MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB at ' + MONGO_URI))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Схема данных (Model)
const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});
const Todo = mongoose.model('Todo', TodoSchema);

// --- ENDPOINTS (Требование: 3+ endpoints) ---

// 1. Healthcheck (Требование: Liveness probe для Kubernetes)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', db_state: mongoose.connection.readyState });
});

// 2. Получить все задачи
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Создать задачу
app.post('/todos', async (req, res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();

        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Экспортируем app и server для тестов, чтобы не занимать порт дважды
// Если файл запущен напрямую (node index.js), то стартуем сервер
if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = { app, mongoose, Todo };
