const { Router } = require('express');
const passport = require('passport');
const QuestionTable = require('../question/table');

const router = Router();

router.get('/all', (req, res, next) => {
	QuestionTable.getAllQuestions()
		.then(questions => res.json(questions))
		.catch(err => next(err));
		//console.error('error', err));
});

router.post('/random',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
	QuestionTable.getRandomQuestionsByCategoryCounts(req.body)
		.then(testLists => res.json(testLists))
		.catch(err => console.error('error', err))
})

module.exports = router;
