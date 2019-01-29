// note a lot of actions look similar except for the function name, and action type
// maybe create generic actions? or was that the entire point?

// action types
export const REQUEST_ALL_QUESTIONS = 'REQUEST_ALL_QUESTIONS';
export const RECEIVE_ALL_QUESTIONS = 'RECEIVE_ALL_QUESTIONS';

// fetch constants
const API_GET_QUESTIONS = 'http://localhost:3000/questions/all';

export function requestAllQuestions() {
	return {
		type: REQUEST_ALL_QUESTIONS,
		retrieving: true
	}
}

export function receiveAllQuestions(questions) {
	return {
		type: RECEIVE_ALL_QUESTIONS,
		questions,
		retrieving: false
	}
}

export const fetchQuestions = () => dispatch => {
	dispatch(requestAllQuestions());
	return fetch(API_GET_QUESTIONS)
		.then(resp => resp.json())
		.then(json => dispatch(receiveAllQuestions(json)))
		.catch(err => console.error('fetch error', err));
} 