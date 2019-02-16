import { REQUEST_REGISTRATION, RECEIVE_REGISTRATION,
	REQUEST_LOGIN, RECEIVE_LOGIN } from './AuthActions';

export function auth(state = { userRegistered: false }, action) {
	switch(action.type) {

		case REQUEST_REGISTRATION:
		case REQUEST_LOGIN:
			return {
				...state,
				retrieving: action.retrieving
			}
		case RECEIVE_REGISTRATION:
			return {
				...state,
				retrieving: action.retrieving,
				userRegistered: action.userRegistered,
				registrationError: action.registrationError
			}
		case RECEIVE_LOGIN:
			return {
				...state,
				retrieving: action.retrieving,
				jwt: action.jwt,
				email: action.email,
				loginError: action.loginError
			}
		default:
			return state;
	}
}