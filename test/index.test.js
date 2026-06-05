const request = require('supertest');
const app = require('../index');

describe('EduPulse API Endpoints', () => {
    
    it('should return health status', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('healthy');
        expect(res.body.service).toEqual('EduPulse API');
    });

    it('should fetch all students', async () => {
        const res = await request(app).get('/api/students');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThanOrEqual(2);
    });
    
    it('should fetch at-risk students', async () => {
        const res = await request(app).get('/api/students/at-risk');
        expect(res.statusCode).toEqual(200);
        expect(res.body[0].atRisk).toEqual(true);
    });

    it('should analyze a new student and flag as at-risk if score is low', async () => {
        const newStudent = { name: 'Charlie', engagementScore: 40 };
        const res = await request(app).post('/api/students/analyze').send(newStudent);
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual('Charlie');
        expect(res.body.atRisk).toEqual(true);
        expect(res.body.catchUpPath).toContain('AI Generated Path');
    });
    
    it('should return 400 for invalid student analysis payload', async () => {
        const res = await request(app).post('/api/students/analyze').send({ name: 'Dave' });
        expect(res.statusCode).toEqual(400);
    });

    it('should expose prometheus metrics', async () => {
        const res = await request(app).get('/metrics');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('http_request_duration_ms');
    });
});
