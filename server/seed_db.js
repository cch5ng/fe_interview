const QuestionTable = require('./app/question/table');
const TestTable = require('./app/test/table');

// seed questions
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

// seed tests
let dummyDate = new Date();

let dummyQuestions = [
		{	content: 'Explain how ^this^ works in JavaScript',
			question_completed: false,
			needs_review: true,
			question_id: 2
		},
		{	content: "Explain why the following doesn't work as an IIFE: ^function foo(){ }();^.",
		question_completed: true,
		needs_review: true,
		question_id: 10
		}
	]

const TestData = [
	{	name: 'dummy test 1',
		date_taken: dummyDate,
		time_total: 30000,
		time_taken: 20000,
		questions: dummyQuestions
	},
	{	name: 'dummy test 2',
		date_taken: dummyDate,
		time_total: 40000,
		time_taken: 20000,
		questions: dummyQuestions
	},
	{	name: 'dummy test 3',
		date_taken: dummyDate,
		time_total: 25000,
		time_taken: 20000,
		questions: dummyQuestions
	}
];

TestData.forEach(test => {
	TestTable.storeTest(test)
		.then(testId => console.log('testId', testId))
		.catch(err => console.error('error', err));
})

console.log('database seeded');
