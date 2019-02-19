import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { REQUEST_REGISTRATION, RECEIVE_REGISTRATION, fetchRegister,
	REQUEST_LOGIN, RECEIVE_LOGIN, fetchLogin } from './AuthActions';

jest.mock('../../utils/http_requests');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Async Auth Actions', () => {

	describe('fetch register ', () => {
		const expectedActions = [
	    { type: REQUEST_REGISTRATION, retrieving: true },
	    { type: RECEIVE_REGISTRATION, retrieving: false,
				userRegistered: true,
				registrationError: '',
			}
	  ];

	  const registration = {
	  	email: 'dummy@d.com',
	  	password: 'password'
	  }

		const expectedActionsFail = [
	    { type: REQUEST_REGISTRATION, retrieving: true },
	    { type: RECEIVE_REGISTRATION, retrieving: false,
				userRegistered: false,
				registrationError: 'registration could not be completed',
			}
	  ];

		it('fetch register should return', () => {
			const store = mockStore({ auth: {} })
	    return store.dispatch(fetchRegister(registration)).then(() => {
	      expect(store.getActions()).toEqual(expectedActions)
	    })
		})

		it('fetch register should handle error', () => {
			const store = mockStore({ auth: {} })
	    return store.dispatch(fetchRegister()).then(() => {
	      expect(store.getActions()).toEqual(expectedActionsFail)
	    })
		})
	})

	describe('fetch login ', () => {
		const expectedLoginActions = [
	    { type: REQUEST_LOGIN, retrieving: true },
	    { type: RECEIVE_LOGIN, retrieving: false,
				jwt: 'dummy token',
				email: 'zzz@z.com',
				loginError: ''
			}
	  ];

		it('fetch login should return', () => {
			const store = mockStore({ auth: {} })
	    return store.dispatch(fetchLogin(registration)).then(() => {
	      expect(store.getActions()).toEqual(expectedLoginActions)
	    })
		})

		const expectedLoginActionsFail = [
	    { type: REQUEST_LOGIN, retrieving: true },
	    { type: RECEIVE_LOGIN, retrieving: false,
				jwt: '',
				email: null,
				loginError: 'login could not be completed'
			}
	  ];

		it('fetch login should handle error', () => {
			const store = mockStore({ auth: {} })
	    return store.dispatch(fetchLogin()).then(() => {
	      expect(store.getActions()).toEqual(expectedLoginActionsFail)
	    })
		})
	})



})
