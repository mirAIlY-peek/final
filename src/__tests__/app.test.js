const request = require('supertest');
const { app, mongoose, Todo } = require('../index');

describe('Todo API', () => {

    // Перед тестами чистим базу (но пока у нас мок или in-memory, это просто для порядка)
    // В реальном CI мы будем поднимать сервис MongoDB
    beforeAll(async () => {
        // Ждем пока mongoose подключится (или упадет, если базы нет локально)
        // Для локального запуска тестов без базы можно мокать,
        // но мы будем поднимать базу в Docker Compose и CI, так что это ок.
    });

    afterAll(async () => {
        await mongoose.connection.close(); // Закрываем соединение после тестов
    });

    // Тест 1: Проверка Healthcheck
    it('GET /health should return 200 UP', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('UP');
    });

    // Тест 2: Создание задачи
    it('POST /todos should create a new task', async () => {
        const task = { title: "Test Task via Jest" };
        const res = await request(app).post('/todos').send(task);

        expect(res.statusCode).toEqual(201);
        expect(res.body.title).toEqual(task.title);
        expect(res.body.completed).toEqual(false);

        // Сохраняем ID для следующего теста (опционально)
    });

    // Тест 3: Получение списка
    it('GET /todos should return an array', async () => {
        const res = await request(app).get('/todos');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0); // Потому что мы создали одну выше
    });
});
