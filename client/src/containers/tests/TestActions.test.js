import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { REQUEST_ALL_TESTS, RECEIVE_ALL_TESTS, fetchTests } from './TestActions';

jest.mock('../../utils/http_requests');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test Actions', () => {

	describe('async fetch tests', () => {

		const expectedActions = [
	    { type: REQUEST_ALL_TESTS, retrieving: true },
	    { type: RECEIVE_ALL_TESTS, retrieving: false,
	  		tests: [
					{
						date_taken: "2019-02-19T08:00:00.000Z",
						email: "d@d.com",
						id: 25,
						name: "d's test ",
						questions: [
							{
								content: "When building a new web site or maintaining one, can you explain some techniques you have used to increase performance?",
								id: 93,
								response: null,
								sort_order: 1,
								status: "not_visited"	,		
							},
							{
								content: "What is Flash of Unstyled Content? How do you avoid FOUC?",
								id: 109,
								response: "",
								sort_order: 0,
								status: "completed",
							}		
						],
						status: "completed",
						time_remaining: 1000,
						time_total: 600000,
					}
				]
	  	}
	  ];

		it('should return', () => {
			const store = mockStore({ tests: {} })
	    return store.dispatch(fetchTests({email: 'z@z.com', token: 'dummy'}))
		    .then(() => {
		      expect(store.getActions()).toEqual(expectedActions)
		    })
		})

		// it('should handle error', () => {
		// })

	})

})