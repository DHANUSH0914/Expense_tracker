const express = require('express');
const morgan = require('morgan');
const { validationResult } = require('express-validator');

const app = express();

// Middleware for HTTP request logging
app.use(morgan('dev'));

// Middleware for parsing JSON bodies
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Example route with request validation
app.post('/api/example', [
    // Validation rules (you can add more)
    // For example: check('email').isEmail(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Handle your logic here
    res.send('Request is valid!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});