import { REQUEST_ALL_TESTS, RECEIVE_ALL_TESTS } from './TestActions';

export function tests(state = {}, action) {
	switch(action.type) {

		case REQUEST_ALL_TESTS:
			return {
				...state,
				retrieving: action.retrieving
			}
		case RECEIVE_ALL_TESTS:
			let testsObj = {};
			action.tests.forEach(test => {
				let id = test.id;
				testsObj[id] = test;
			});
			return {
				...state,
				tests: testsObj,
				retrieving: false
			}
		default:
			return state;
	}
}