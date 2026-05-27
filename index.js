const express = require('express');
const client = require('prom-client');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// In-memory data store for tasks
let tasks = [
    { id: 1, title: 'Learn Jenkins', completed: false },
    { id: 2, title: 'Build Docker Image', completed: true }
];

// Prometheus Metrics Setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in microseconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

// Middleware to record metrics
app.use((req, res, next) => {
    const end = httpRequestDurationMicroseconds.startTimer();
    res.on('finish', () => {
        end({ route: req.route ? req.route.path : req.path, code: res.statusCode, method: req.method });
    });
    next();
});

// Expose metrics endpoint for Prometheus (Monitoring Stage)
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', version: '1.0.0' });
});

// GET all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// GET task by ID
app.get('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
});

// POST a new task
app.post('/api/tasks', (req, res) => {
    const task = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: req.body.completed || false
    };
    tasks.push(task);
    res.status(201).json(task);
});

// Export the app for testing
module.exports = app;

// Start server if not running in test mode
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
}
