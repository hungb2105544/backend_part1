const express = require('express');
const cors = require('cors');

const app = express();

const contactRouter = require('./app/routes/contact.route');

app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactRouter);

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to contact book application',
    });
});

app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;