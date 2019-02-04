import { REQUEST_ALL_TESTS, RECEIVE_ALL_TESTS, REQUEST_RANDOM_TEST,
	RECEIVE_RANDOM_TEST, REQUEST_INIT_TEST, RECEIVE_INIT_TEST, START_TEST,
	COMPLETE_TEST } from './TestActions';

export function tests(state = {}, action) {
	switch(action.type) {

		case REQUEST_ALL_TESTS:
		case REQUEST_RANDOM_TEST:
		case REQUEST_INIT_TEST:
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
		case RECEIVE_RANDOM_TEST:
		case RECEIVE_INIT_TEST:
			return {
				...state,
				curTest: action.curTest,
				retrieving: false
			}
		case START_TEST:
		case COMPLETE_TEST:
			return {
				...state,
				curTest: {...state.curTest, status: action.status},
			}
		default:
			return state;
	}
}