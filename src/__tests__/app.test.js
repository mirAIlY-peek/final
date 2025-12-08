const request = require('supertest');
const { app, mongoose, Todo } = require('../index');

describe('Todo API', () => {


    beforeAll(async () => {

    });

    afterAll(async () => {
        await mongoose.connection.close();
    });


    it('GET /health should return 200 UP', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('UP');
    });


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
