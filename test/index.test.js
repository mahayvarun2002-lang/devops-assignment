const request = require('supertest');
const app = require('../index');

describe('API Endpoints', () => {
    
    it('should return health status', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'healthy');
    });

    it('should fetch all tasks', async () => {
        const res = await request(app).get('/api/tasks');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should create a new task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({
                title: 'New Integration Test Task'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('title', 'New Integration Test Task');
    });

    it('should return 404 for unknown task', async () => {
        const res = await request(app).get('/api/tasks/999');
        expect(res.statusCode).toEqual(404);
    });

    it('should expose prometheus metrics', async () => {
        const res = await request(app).get('/metrics');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('nodejs_version_info');
    });
});
