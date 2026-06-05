const express = require('express');
const client = require('prom-client');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Prometheus Metrics Setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();
const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000]
});

// Middleware to record metrics
app.use((req, res, next) => {
    const end = httpRequestDurationMicroseconds.startTimer();
    res.on('finish', () => {
        end({ method: req.method, route: req.route ? req.route.path : req.path, code: res.statusCode });
    });
    next();
});

// In-memory data store for students
let students = [
    { id: 1, name: 'Alice', engagementScore: 85, atRisk: false },
    { id: 2, name: 'Bob', engagementScore: 32, atRisk: true, catchUpPath: 'Review Module 2, complete Quiz 2 retry.' }
];

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', version: '1.0.0', service: 'EduPulse API' });
});

app.get('/api/students', (req, res) => {
    res.status(200).json(students);
});

app.get('/api/students/at-risk', (req, res) => {
    const atRiskStudents = students.filter(s => s.atRisk);
    res.status(200).json(atRiskStudents);
});

app.post('/api/students/analyze', (req, res) => {
    const { name, engagementScore } = req.body;
    if (!name || engagementScore === undefined) {
        return res.status(400).json({ error: 'Name and engagementScore are required.' });
    }
    
    // Simulate ML risk detection and GenAI path generation
    const atRisk = engagementScore < 50;
    const catchUpPath = atRisk ? `AI Generated Path: Focus on core concepts for ${name}.` : null;
    
    const newStudent = {
        id: students.length + 1,
        name,
        engagementScore,
        atRisk,
        catchUpPath
    };
    
    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.send(await client.register.metrics());
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`EduPulse API listening on port ${port}`);
    });
}

module.exports = app;
