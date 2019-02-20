// renamed so it would not conflict with jest test file naming

const { Router } = require('express');
const passport = require('passport');
const TestTable = require('../test/table');
const TestQuestionTable = require('../testQuestion/table');
const FEUserTable = require('../fe_user/table');

const router = Router();

router.post('/all',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		TestTable.getAllTests(req.body)
			.then(tests => {
				res.json(tests);
			})
			.catch(err => {
				//console.error('error', err);
				next(err);	
			});
});

router.post('/detail',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		TestTable.getTestById(req.body)
			.then(result => {
				let newTest = result[0];
				let testQuestions = result[1];
				newTest.questions = testQuestions;
				res.json(newTest);
			})
			.catch(err => {
				//console.error('error', err)
				next(err);
			})
})

router.post('/new', 
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		FEUserTable.getIdByEmail(req.body)
			.then(uid => {
				let user_id = parseInt(uid, 10);
				TestTable.storeTest({...req.body, user_id})
					.then(testId => res.json(testId))
					.catch(err => console.error('error', err))
			})
			.catch(err => console.error('error', err))
})

router.post('/update',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		TestTable.updateTest(req.body)
			.then(testId => res.json(testId))
			.catch(err => console.error('error', err))
})

router.post('/updateQuestion',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
	TestQuestionTable.updateTestQuestion(req.body)
		.then(questionId => res.json(questionId))
		.catch(err => console.error('error', err))
})


module.exports = router;
