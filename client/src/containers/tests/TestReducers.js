/**
 * @prettier
 */

import { REQUEST_ALL_TESTS, RECEIVE_ALL_TESTS, REQUEST_RANDOM_TEST,
	RECEIVE_RANDOM_TEST, REQUEST_INIT_TEST, RECEIVE_INIT_TEST, START_TEST,
	COMPLETE_TEST, REQUEST_UPDATE_TEST, RECEIVE_UPDATE_TEST,
	REQUEST_UPDATE_TEST_QUESTION, RECEIVE_UPDATE_TEST_QUESTION,
	REQUEST_TEST_DETAIL, RECEIVE_TEST_DETAIL } from './TestActions';

export function tests(state = {}, action) {
	switch(action.type) {

		case REQUEST_ALL_TESTS:
		case REQUEST_RANDOM_TEST:
		case REQUEST_INIT_TEST:
		case REQUEST_UPDATE_TEST:
		case REQUEST_UPDATE_TEST_QUESTION:
		case REQUEST_TEST_DETAIL:
			return {
				...state,
				retrieving: action.retrieving
			}
		case REQUEST_ALL_TESTS:
			return {
				...state,
				retrieving: action.retrieving,
				testError: action.testError
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
				testError: action.testError,
				retrieving: false
			}
		case RECEIVE_RANDOM_TEST:
		case RECEIVE_INIT_TEST:
		case RECEIVE_TEST_DETAIL:
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
		case RECEIVE_UPDATE_TEST_QUESTION:
			const { question_id, response, question_status } = action.questionData;

			return {
				...state,
				curTest: {
					...state.curTest,
					questions: { 
						...state.curTest.questions,
						[question_id]: { 
							...state.curTest.questions[question_id],
							response,
							status: question_status,
						}
					}
				},
			}
		case RECEIVE_UPDATE_TEST:
			const { test_id, time_remaining, status } = action.testData;

			return {
				...state,
				curTest: {
					...state.curTest,
					id: test_id,
					time_remaining,
					status
				},
			}
		default:
			return state;
	}
}