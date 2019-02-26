import http_requests from '../../utils/http_requests';

// registration
export const REQUEST_REGISTRATION = 'REQUEST_REGISTRATION';
export const RECEIVE_REGISTRATION = 'RECEIVE_REGISTRATION';

export function requestRegistration() {
	return {
		type: REQUEST_REGISTRATION,
		retrieving: true,
		registrationError: null,
	}
}

export function receiveRegistration(result) {
	let userRegistered = false;
	let registrationError = '';
	if (result.userId) {
		userRegistered = true;
	}

	if (result.error) {
		registrationError = result.error;
	}

	return {
		type: RECEIVE_REGISTRATION,
		userRegistered,
		registrationError,
		retrieving: false
	}
}

export const fetchRegister = (login) => dispatch => {
	dispatch(requestRegistration());
	return http_requests.Auth.register(login)
		.then(json => dispatch(receiveRegistration(json)))
		.catch(err => console.error('fetch error', err));
}

// login
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';

export function requestLogin() {
	return {
		type: REQUEST_LOGIN,
		retrieving: true,
		loginError: null
	}
}

export function receiveLogin(result) {
	let jwt = '';
	let loginError = '';
	let email = null;

	if (result.jwt) {
		jwt = result.jwt;


		// save jwt to localstorage
		localStorage.setItem('fe_interview_session', jwt);
	}

	if (result.email) {
		email = result.email;
	}

	if (result.error) {
		loginError = result.error;
	}

	return {
		type: RECEIVE_LOGIN,
		jwt,
		email,
		loginError,
		retrieving: false
	}
}

export const fetchLogin = (login) => dispatch => {
	dispatch(requestLogin());

	return http_requests.Auth.login(login)
		.then(json => dispatch(receiveLogin(json)))
		.catch(err => console.error('fetch error', err));
}

// logout
export const LOGOUT = 'LOGOUT';

export function logout() {
	return {
		type: LOGOUT,
		email: ''
	}
}

