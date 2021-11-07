const express = require('express');
const router = express.Router();
const app = express();
const expressEjsLayout = require('express-ejs-layouts');

// EJS Setup
app.set('view engine', 'ejs');
app.use(expressEjsLayout);

// BodyParser

// Serve static files
app.use(express.static('dist'));

// Routes
app.use('/', require('./routes/index'));

app.listen(3001);

