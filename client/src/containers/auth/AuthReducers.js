import { REQUEST_REGISTRATION, RECEIVE_REGISTRATION,
	REQUEST_LOGIN, RECEIVE_LOGIN, LOGOUT, CLEAR_LOGIN_ERROR } from './AuthActions';

export function auth(state = { userRegistered: false }, action) {
	switch(action.type) {

		case REQUEST_REGISTRATION:
			return {
				...state,
				retrieving: action.retrieving,
				registrationError: action.registrationError
			}
		case REQUEST_LOGIN:
			return {
				...state,
				retrieving: action.retrieving,
				loginError: action.loginError
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
		case LOGOUT:
			return {
				...state,
				email: action.email
			}
		case CLEAR_LOGIN_ERROR:
			return {
				...state,
				loginError: action.loginError
			}
		default:
			return state;
	}
}