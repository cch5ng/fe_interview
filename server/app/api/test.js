const { Router } = require('express');
const TestTable = require('../test/table');
const TestQuestionTable = require('../testQuestion/table');

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

router.post('/updateQuestion', (req, res, next) => {
	console.log('req.body', req.body);
	TestQuestionTable.updateTestQuestion(req.body)
		//.then(() => console.log('question updated in test_question table'))
		.then(questionId => res.json(questionId))
		.catch(err => console.error('error', err))
})


module.exports = router;
