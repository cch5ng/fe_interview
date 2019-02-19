import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { REQUEST_REGISTRATION, RECEIVE_REGISTRATION, fetchRegister } from './AuthActions';

jest.mock('../../utils/http_requests');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Async Auth Actions', () => {

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
