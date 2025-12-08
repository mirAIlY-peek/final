const request = require('supertest');
const { app, mongoose } = require('../index');
const Todo = require('../models/todo');

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/todos-test');
    await Todo.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Todo API', () => {

    it('GET /health should return 200 UP', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('UP');
    });

    it('POST /todos should create a new task', async () => {
        const task = { title: "Test Task via Jest" };
        const res = await request(app).post('/todos').send(task);

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe(task.title);
        expect(res.body.completed).toBe(false);
    });

    it('GET /todos should return an array', async () => {
        const res = await request(app).get('/todos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
