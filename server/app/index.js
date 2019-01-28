const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const testRouter = require('./api/test');

const app = express();

app.use(cors({ 'http://localhost:1234' }));
app.use(bodyParser.json());
app.use('/test', testRouter);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		type: 'error',
		message: err.message
	});
});

module.exports = app;
