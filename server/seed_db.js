const QuestionTable = require('./app/question/table');

const JavaScriptQuestions = require('./question_output/javascript-questions');
const CssQuestions = require('./question_output/css-questions');
const FunQuestions = require('./question_output/fun-questions');
const GeneralQuestions = require('./question_output/general-questions');
const HtmlQuestions = require('./question_output/html-questions');
const NetworkQuestions = require('./question_output/network-questions');
const PerformanceQuestions = require('./question_output/performance-questions');
const TestingQuestions = require('./question_output/testing-questions');
const CodingQuestions = require('./question_output/coding-questions');

const outputObjects = [
	JavaScriptQuestions,
	CssQuestions,
	FunQuestions,
	GeneralQuestions,
	HtmlQuestions,
	NetworkQuestions,
	PerformanceQuestions,
	TestingQuestions,
	CodingQuestions
];

outputObjects.forEach(qObj => {
	Object.keys(qObj).forEach((id, idx) => {
		let question = qObj[id];
		QuestionTable.storeQuestion(question)
			.then(({ questionId }) => {
				console.log('questionId', questionId);
			})
				.catch(err => console.error('error', err))				
	});
});

console.log('database seeded');
