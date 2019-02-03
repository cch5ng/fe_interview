import { getRandomlyOrderedList, getRandomArbitrary,
	objRandomArReducer, randomArToDict } from '../../../utils/helper';

// fetch constants
const API_GET_TESTS = 'http://localhost:3000/test/all';
const API_POST_RANDOM_TEST = 'http://localhost:3000/question/random';
const API_POST_INIT_TEST = 'http://localhost:3000/test/new'

// action types
export const REQUEST_ALL_TESTS = 'REQUEST_ALL_TESTS';
export const RECEIVE_ALL_TESTS = 'RECEIVE_ALL_TESTS';

export function requestAllTests() {
	return {
		type: REQUEST_ALL_TESTS,
		retrieving: true
	}
}

export function receiveAllTests(tests) {
	return {
		type: RECEIVE_ALL_TESTS,
		tests,
		retrieving: false
	}
}

export const fetchTests = () => dispatch => {
	dispatch(requestAllTests());
	return fetch(API_GET_TESTS)
		.then(resp => resp.json())
		.then(json => dispatch(receiveAllTests(json)))
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
	console.log('curTest', curTest);
	let questionsDict = randomArToDict(curTest.questions);
	let newCurTest = { ...curTest, questions: questionsDict };
	console.log('newCurTest', newCurTest);

	return {
		type: RECEIVE_RANDOM_TEST,
		curTest: newCurTest,
		retrieving: false
	}
}

export const fetchRandomTest = (questionData, testData) => dispatch => {
	dispatch(requestRandomTest());
	return fetch(API_POST_RANDOM_TEST,
			{	method: 'POST',
				headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
			}
		)
		.then(resp => resp.json())
		.then(json => {
			let flatQuestionsAr = [];
			let curTestObj = {};
			let randomizedQuestions = [];
			// concat lists of questions into one flat list

			json.forEach(questList => {
				questList.forEach(quest => {
					flatQuestionsAr.push(quest);
				})
			})

			// generate a randomized order of the flat list
			randomizedQuestions = getRandomlyOrderedList(flatQuestionsAr);

			curTestObj.name = testData.name;
			curTestObj.questions = randomizedQuestions;
			curTestObj.date_taken = null;
			curTestObj.time_total = testData.time_total;
			curTestObj.status = 'initialized';

			// make a whole current test object
			dispatch(receiveRandomTest(curTestObj));
			//dispatch async action to create a test in backend
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
	dispatch(requestInitTest());
	return fetch(API_POST_INIT_TEST,
			{	method: 'POST',
				headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
			}
		)
		.then(resp => resp.json())
		.then(json => {
			let curTest = {...testData, id: json.test_id}
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

