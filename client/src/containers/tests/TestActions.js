// fetch constants
const API_GET_TESTS = 'http://localhost:3000/test/all';
const API_POST_RANDOM_TEST = 'http://localhost:3000/test/random';

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

export function receiveRandomTest(test) {
	return {
		type: RECEIVE_RANDOM_TEST,
		tests,
		retrieving: false
	}
}

export const fetchRandomTest = (data) => dispatch => {
	dispatch(requestRandomTest());
	return fetch(API_POST_RANDOM_TEST,
			{	method: 'POST',
				headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
			}
		)
		.then(resp => resp.json())
		.then(json => dispatch(receiveRandomTest(json)))
		.catch(err => console.error('fetch error', err));
} 