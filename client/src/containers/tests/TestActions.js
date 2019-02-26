import http_requests from '../../utils/http_requests';

import { getRandomlyOrderedList, getRandomArbitrary,
	objRandomArReducer, randomArToDict, formatDateTwoChar } from '../../utils/helper';

// fetch constants
const API_ROOT = process.env.API_ROOT;
//const API_GET_TEST_DETAIL = `${API_ROOT}test/detail`;
const API_POST_RANDOM_TEST = `${API_ROOT}question/random`;
//const API_POST_INIT_TEST = `${API_ROOT}test/new`;
const API_POST_UPDATE_TEST_QUESTION = `${API_ROOT}test/updateQuestion`;
const API_POST_UPDATE_TEST = `${API_ROOT}test/update`;

// action types
export const REQUEST_ALL_TESTS = 'REQUEST_ALL_TESTS';
export const RECEIVE_ALL_TESTS = 'RECEIVE_ALL_TESTS';

export function requestAllTests() {
	return {
		type: REQUEST_ALL_TESTS,
		retrieving: true,
		testError: null
	}
}

export function receiveAllTests(resp) {
	let tests = resp.tests ? resp.tests : {};
	let testError = resp.testError ? resp.testError : null; 

	return {
		type: RECEIVE_ALL_TESTS,
		tests,
		testError,
		retrieving: false
	}
}

export const fetchTests = ({ email }) => dispatch => {
	let token = localStorage.getItem('fe_interview_session');

	dispatch(requestAllTests());
	return http_requests.Tests.getAll({email, token})
		.then(json => dispatch(receiveAllTests(json)))
		.catch(err => console.error('fetch error', err));
}

// action types
export const REQUEST_TEST_DETAIL = 'REQUEST_TEST_DETAIL';
export const RECEIVE_TEST_DETAIL = 'RECEIVE_TEST_DETAIL';

export function requestTestDetail() {
	return {
		type: REQUEST_TEST_DETAIL,
		retrieving: true
	}
}

export function receiveTestDetail(test) {
	return {
		type: RECEIVE_TEST_DETAIL,
		curTest: test,
		retrieving: false
	}
}

export const fetchTestById = ({ id }) => dispatch => {
	let token = localStorage.getItem('fe_interview_session');

	dispatch(requestTestDetail());
	return http_requests.Tests.getTestById({id, token})
		.then(json => {
			let randomizedQuestionsObj = {};

			json.questions.forEach(question => {
				let questionId = question.id;
				randomizedQuestionsObj[questionId] = question;
			})
			json.questions = randomizedQuestionsObj;

			dispatch(receiveTestDetail(json));
		})
		.catch(err => console.error('fetch error', err));
}

// action types
export const REQUEST_RANDOM_TEST = 'REQUEST_RANDOM_TEST';
export const RECEIVE_RANDOM_TEST = 'RECEIVE_RANDOM_TEST';

export function requestRandomTest() {
	return {
		type: REQUEST_RANDOM_TEST,
		retrieving: true
	}
}

export function receiveRandomTest(curTest) {
	return {
		type: RECEIVE_RANDOM_TEST,
		curTest: curTest,
		retrieving: false
	}
}

export const fetchRandomTest = (questionData, testData) => dispatch => {
	let token = localStorage.getItem('fe_interview_session');

	dispatch(requestRandomTest());
	return http_requests.Questions.getRandomQuestions({questionData, token})
		.then(json => {
			let flatQuestionsAr = [];
			let curTestObj = {};
			let randomizedQuestions = [];
			// concat lists of questions into one flat list
			let randomizedQuestionsObj = {};

			json.forEach(questList => {
				questList.forEach(quest => {
					flatQuestionsAr.push(quest);
				})
			})

			// generate a randomized order of the flat list
			randomizedQuestions = getRandomlyOrderedList(flatQuestionsAr);

			randomizedQuestions.forEach(questObj => {
				let id = questObj.id;
				randomizedQuestionsObj[id] = questObj;
			});

			curTestObj.name = testData.name;
			curTestObj.questions = randomizedQuestionsObj;
			curTestObj.time_total = testData.time_total;
			curTestObj.status = 'initialized';
			curTestObj.email = testData.email;

			let curDate = new Date();
			let curDateMonth = curDate.getMonth() + 1;
			let curDateMonthStr = formatDateTwoChar(curDateMonth.toString());
			let curDateDay = curDate.getDate();
			let curDateDayStr = formatDateTwoChar(curDateDay.toString());
			let curDateStr = `${curDate.getFullYear()}-${curDateMonthStr}-${curDateDayStr}`;

			curTestObj.date_taken = curDateStr;

			// make a whole current test object
			// Redux store better uses questions in object format (for updates)
			dispatch(receiveRandomTest(curTestObj));
			//dispatch async action to create a test in backend
			// BE needs questions in array format
			curTestObj.questions = randomizedQuestions;
			dispatch(fetchInitTest(curTestObj));
		})
		.catch(err => console.error('fetch error', err));
}

// action types
export const REQUEST_INIT_TEST = 'REQUEST_INIT_TEST';
export const RECEIVE_INIT_TEST = 'RECEIVE_INIT_TEST';

export function requestInitTest() {
	return {
		type: REQUEST_INIT_TEST,
		retrieving: true
	}
}

export function receiveInitTest(curTest) {
	return {
		type: RECEIVE_INIT_TEST,
		curTest,
		retrieving: false
	}
}

export const fetchInitTest = (testData) => dispatch => {
	let token = localStorage.getItem('fe_interview_session');
	let email = testData.email || null;

	dispatch(requestInitTest());
	return http_requests.Tests.initializeTest({...testData, token})
		.then(json => {
			let curTest = {...testData, id: json.test_id}

			let randomizedQuestionsObj = {};

			testData.questions.forEach(questObj => {
				let id = questObj.id;
				randomizedQuestionsObj[id] = questObj;
			});
			curTest = { ...curTest, questions: randomizedQuestionsObj };

			dispatch(receiveInitTest(curTest));

		})
		.catch(err => console.error('fetch error', err));
}

// action types
export const START_TEST = 'START_TEST';

export function startTest() {
	return {
		type: START_TEST,
		status: 'active'
	}
}

// action types
export const COMPLETE_TEST = 'COMPLETE_TEST';

export function completeTest() {
	return {
		type: COMPLETE_TEST,
		status: 'completed'
	}
}

// action types
export const REQUEST_UPDATE_TEST_QUESTION = 'REQUEST_UPDATE_TEST_QUESTION';
export const RECEIVE_UPDATE_TEST_QUESTION = 'RECEIVE_UPDATE_TEST_QUESTION';

export function requestUpdateTestQuestion() {
	return {
		type: REQUEST_UPDATE_TEST_QUESTION,
		retrieving: true
	}
}

export function receiveUpdateTestQuestion(questionData) {
	return {
		type: RECEIVE_UPDATE_TEST_QUESTION,
		questionData,
		retrieving: false
	}
}

//should this update the BE?
export const fetchUpdateTestQuestion = (questionData) => dispatch => {
	let token = localStorage.getItem('fe_interview_session');

	dispatch(requestUpdateTestQuestion());
	return http_requests.Tests.updateTestQuestion({...questionData, token})
		.then(json => {
			dispatch(receiveUpdateTestQuestion(questionData));
		})
		.catch(err => console.error('fetch error', err));
}

// action types
export const REQUEST_UPDATE_TEST = 'REQUEST_UPDATE_TEST';
export const RECEIVE_UPDATE_TEST = 'RECEIVE_UPDATE_TEST';

export function requestUpdateTest() {
	return {
		type: REQUEST_UPDATE_TEST,
		retrieving: true
	}
}

export function receiveUpdateTest(testData) {
	return {
		type: RECEIVE_UPDATE_TEST,
		testData,
		retrieving: false
	}
}

//should this update the BE?
export const fetchUpdateTest = (testData) => dispatch => {
	let token = localStorage.getItem('fe_interview_session');

	dispatch(requestUpdateTest());
	return fetch(API_POST_UPDATE_TEST,
			{	method: 'POST',
				headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({...testData, token}),
			}
		)
		.then(resp => resp.json())
		.then(json => {
			dispatch(receiveUpdateTest(testData));
		})
		.catch(err => console.error('fetch error', err));
}
