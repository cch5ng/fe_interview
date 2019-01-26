const { Router } = require('express');
const TestTable = require('../test/table');

const router = Router();

router.get('/all', (req, res, next) => {
	TestTable.getAllTests()
	.then(tests => {
		res.json(tests);
	})
	.catch(err => {
		//console.error('error', err);
		next(err);	
	});
});

module.exports = router;
