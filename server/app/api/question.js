const { Router } = require('express');
const QuestionTable = require('../question/table');

const router = Router();

router.get('/all', (req, res, next) => {
	QuestionTable.getAllQuestions()
		.then(questions => res.json(questions))
		.catch(err => next(err));
		//console.error('error', err));
});

module.exports = router;