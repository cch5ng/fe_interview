const { Router } = require('express');
const passport = require('passport');
const TestTable = require('../test/table');
const TestQuestionTable = require('../testQuestion/table');

const router = Router();

router.post('/all',
	passport.authenticate('jwt', { session: false }),

	(req, res, next) => {
		TestTable.getAllTests()
			.then(tests => {
				res.json(tests);
			})
			.catch(err => {
				//console.error('error', err);
				next(err);	
			});
});

router.post('/detail', (req, res, next) => {
	TestTable.getTestById(req.body)
		.then(result => {
			let newTest = result[0];
			let testQuestions = result[1];
			newTest.questions = testQuestions;
			res.json(newTest);
		})
		.catch(err => console.error('error', err))
})

router.post('/new', (req, res, next) => {
	console.log('req.body', req.body);
	TestTable.storeTest(req.body)
		.then(testId => res.json(testId))
		.catch(err => console.error('error', err))
})

router.post('/update', (req, res, next) => {
	console.log('req.body', req.body);
	TestTable.updateTest(req.body)
		//.then(() => console.log('question updated in test_question table'))
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
