// action types
export const REQUEST_ALL_TESTS = 'REQUEST_ALL_TESTS';
export const RECEIVE_ALL_TESTS = 'RECEIVE_ALL_TESTS';

// fetch constants
const API_GET_TESTS = 'http://localhost:3000/test/all';

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