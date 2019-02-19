const API_ROOT = 'http://localhost:3000/';
const QUESTIONS_ALL = 'question/all';
const QUESTIONS_RANDOM = 'question/random';
const AUTH_REGISTER = 'auth/register';
const AUTH_LOGIN = 'auth/login';
const TESTS_ALL = 'test/all';

const requests = {
  get: url => {
  	return new Promise((resolve, reject) => {
			fetch(url)
				.then(resp => resolve(resp.json()))
				.catch(err => reject(err))
					//console.error('fetch error', err));
  	})
  },
  post: (url, body) => {
  	return new Promise((resolve, reject) => {
			fetch(url,
				{	method: 'POST',
					headers: {
	            "Content-Type": "application/json",
	        },
	        body: JSON.stringify(body),
				}
			)
				.then(resp => resolve(resp.json()))
				.catch(err => reject(err))
  	})
  },
  // postJwt: (url, body) => {
  // 	return new Promise((resolve, reject) => {
		// 	fetch(url,
		// 		{	method: 'POST',
		// 			headers: {
	 //            "Content-Type": "application/json",
	 //        },
	 //        body: JSON.stringify(login),
		// 		}
		// 	)
		// 		.then(resp => resolve(resp.json()))
		// 		.catch(err => reject(err))
  // 	})
  // }
};

const Questions = {
	getAll: () => {
		return requests.get(`${API_ROOT}${QUESTIONS_ALL}`);
	},
	getRandomQuestions: (body) => {
		return requests.post(`${API_ROOT}${QUESTIONS_RANDOM}`, body)
	}
}

const Auth = {
	register: (body) => {
		return requests.post(`${API_ROOT}${AUTH_REGISTER}`, body)
	},
	login: (body) => {
		return requests.post(`${API_ROOT}${AUTH_LOGIN}`, body)
	}
}

const Tests = {
	getAll: (body) => {
		return requests.post(`${API_ROOT}${TESTS_ALL}`, body)
	}
}

export default {
	Questions,
	Auth,
	Tests,
}
