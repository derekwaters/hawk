const express = require('express');
const router = express.Router();
const api = require('../api/api.js');

router.get('/', (req, res) => {
	res.render('index');
});
router.get('/api', (req, res) => {
	console.log('Retrieving API data');
	api.loadData()
	.then((data) => res.send(data));
});

module.exports = router;

