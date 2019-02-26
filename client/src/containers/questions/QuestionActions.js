import http_requests from '../../utils/http_requests';

// action types
export const REQUEST_ALL_QUESTIONS = 'REQUEST_ALL_QUESTIONS';
export const RECEIVE_ALL_QUESTIONS = 'RECEIVE_ALL_QUESTIONS';

// fetch constants
const API_GET_QUESTIONS = 'http://localhost:3000/question/all';

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
	return http_requests.Questions.getAll()
		.then(json => dispatch(receiveAllQuestions(json)))
		.catch(err => console.error('fetch error', err));
} 
