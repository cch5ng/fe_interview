const QuestionTable = require('./app/question/table');

const CodingQuestions = require('./question_output/coding-questions');
const JavaScriptQuestions = require('./question_output/javascript-questions');
const CssQuestions = require('./question_output/css-questions');
const FunQuestions = require('./question_output/fun-questions');
const GeneralQuestions = require('./question_output/general-questions');
const HtmlQuestions = require('./question_output/html-questions');
const NetworkQuestions = require('./question_output/network-questions');
const PerformanceQuestions = require('./question_output/performance-questions');
const TestingQuestions = require('./question_output/testing-questions');

const outputObjects = [
	//CodingQuestions,
	//JavaScriptQuestions,
	CssQuestions//,
	//FunQuestions,
	//GeneralQuestions,
	//HtmlQuestions,
	//NetworkQuestions,
	//PerformanceQuestions,
	//TestingQuestions
];

outputObjects.forEach(qObj => {
	Object.keys(qObj).forEach(id => {
		let question = qObj[id];
		QuestionTable.storeQuestion(question);
	});
});

console.log('database seeded');

// console.log('coding-questions es6 import', CodingQuestions);

// console.log('file javascript-questions.js')
// console.log(Object.keys(`./question_output/javascript-questions.js`).length)

// console.log('file general-questions.js')
// console.log(Object.keys('./question_output/general-questions.js').length)
// console.log('keys general-questions', Object.keys('./question_output/general-questions.js'))

// console.log('keys general-questions', './question_output/general-questions.js'[0])