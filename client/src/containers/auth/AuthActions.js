// BE endpoings
export const API_POST_REGISTRATION = 'http://localhost:3000/auth/register';
export const API_POST_LOGIN = 'http://localhost:3000/auth/login';

// registration
export const REQUEST_REGISTRATION = 'REQUEST_REGISTRATION';
export const RECEIVE_REGISTRATION = 'RECEIVE_REGISTRATION';

export function requestRegistration() {
	return {
		type: REQUEST_REGISTRATION,
		retrieving: true
	}
}

export function receiveRegistration(result) {
	console.log('result', result)

	let userRegistered = false;
	let registrationError = '';
	if (result.userId) {
		userRegistered = true;
	}

	if (result.error) {
		console.log('gets here')
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
	return fetch(API_POST_REGISTRATION,
			{	method: 'POST',
				headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
			}
		)
		.then(resp => resp.json())
		.then(json => dispatch(receiveRegistration(json)))
		.catch(err => console.error('fetch error', err));
}

// login
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';

export function requestLogin() {
	return {
		type: REQUEST_LOGIN,
		retrieving: true
	}
}

export function receiveLogin(result) {
	let jwt = '';
	let loginError = '';
	let user_id = null;

	if (result.jwt) {
		jwt = result.jwt;


		// save jwt to localstorage
		localStorage.setItem('fe_interview_session', jwt);
	}

	if (result.user_id) {
		user_id = result.user_id;
	}

	if (result.error) {
		loginError = result.error;
	}

	return {
		type: RECEIVE_LOGIN,
		jwt,
		user_id,
		loginError,
		retrieving: false
	}
}

export const fetchLogin = (login) => dispatch => {
	console.log('calls fetchLogin');
	dispatch(requestLogin());
	return fetch(API_POST_LOGIN,
			{	method: 'POST',
				headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
			}
		)
		.then(resp => resp.json())
		.then(json => dispatch(receiveLogin(json)))
		.catch(err => console.error('fetch error', err));
}