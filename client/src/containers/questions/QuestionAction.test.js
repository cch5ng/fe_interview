import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchQuestions, REQUEST_ALL_QUESTIONS, RECEIVE_ALL_QUESTIONS } from './QuestionActions';

jest.mock('../../utils/http_requests');

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Question Actions', () => {

	const expectedActions = [
    { type: REQUEST_ALL_QUESTIONS },
    { type: RECEIVE_ALL_QUESTIONS, 
    	questions: { 
    		questions: {
    			55: {
						category: "CSS Questions",
						child_content: null,
						content: "What is CSS selector specificity and how does it work?",
						id: 55,
						sort_order: 0
					},
					56: {
						category: "CSS Questions",
						child_content: null,
						content: "What's the difference between "resetting" and "normalizing" CSS? Which would you choose, and why?",
						id: 56,
						sort_order: 1
					}
    		}
    	}
    }
  ];

	it('should update store for all questions request', () => {

		const store = mockStore({ questions: {} })

    return store.dispatch(fetchQuestions()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })

	})

});
