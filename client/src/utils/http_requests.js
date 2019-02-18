const API_ROOT = 'http://localhost:3000/';
const QUESTIONS_ALL = 'question/all';

const requests = {
  get: url => {
  	return new Promise((resolve, reject) => {
			fetch(url)
				.then(resp => resolve(resp.json()))
				.catch(err => reject(err))
					//console.error('fetch error', err));
  	})
  },
  // post: (url, body) => {
  //   superagent
  //     .post(`${API_ROOT}${url}`, body)
  //     .end(handleErrors)
  //     .then(responseBody)
  // }
};

const Questions = {
	getAll: () => {
		return requests.get(`${API_ROOT}${QUESTIONS_ALL}`);
	}
}

// const Auth = {

// }

// const Tests = {

// }

export default {
	Questions,
	//Auth,
	//Tests,
}
