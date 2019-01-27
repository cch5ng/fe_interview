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

router.post('/new', (req, res, next) => {
	console.log('req.body', req.body);
	TestTable.storeTest(req.body)
		.then(testId => res.json(testId))
		.catch(err => console.error('error', err))
})

module.exports = router;
