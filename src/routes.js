const request = require('supertest');
const { app, mongoose } = require('../index'); 
const Todo = require('../models/todo');

describe('Todo API', () => {


    beforeAll(async () => {
        await Todo.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Тест 1: Healthcheck
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
    });

    // Тест 3: Получение списка
    it('GET /todos should return an array', async () => {
        const res = await request(app).get('/todos');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0); // Должна быть 1 задача (которую создали выше)
    });
});