
const questionsData = [
	{
		category: "CSS Questions",
		child_content: null,
		content: "What is CSS selector specificity and how does it work?",
		id: 55,
		sort_order: 0
	},
	{
		category: "CSS Questions",
		child_content: null,
		content: "What's the difference between 'resetting' and 'normalizing' CSS? Which would you choose, and why?",
		id: 56,
		sort_order: 1
	}
];

const randomQuestionsData = [
	{
		category: "CSS Questions",
		child_content: null,
		content: "dummy question 59",
		id: 59,
		sort_order: 0
	},
	{
		category: "CSS Questions",
		child_content: null,
		content: "dummy question 57",
		id: 57,
		sort_order: 1
	},
	{
		category: "CSS Questions",
		child_content: null,
		content: "What is CSS selector specificity and how does it work?",
		id: 55,
		sort_order: 2
	},
	{
		category: "CSS Questions",
		child_content: null,
		content: "What's the difference between 'resetting' and 'normalizing' CSS? Which would you choose, and why?",
		id: 56,
		sort_order: 3
	},
	{
		category: "CSS Questions",
		child_content: null,
		content: "dummy question 58",
		id: 58,
		sort_order: 4
	}
];

const Questions = {
	getAll: (p) => {
		return new Promise((resolve, reject) => {
			if (p) {
				reject(new Error('questions could not be retrieved'));
			}

			resolve(questionsData);
		})
	},
	getRandomQuestions: (questionData) => {
		return new Promise((resolve, reject) => {
			if (!questionData) {
				reject(new Error('random questions could not be retrieved'));
			}

			resolve(randomQuestionsData);
		})		
	}
}

const userId = 9999990;

const Auth = {
	register: (login) => {
		return new Promise((resolve, reject) => {
			if (!login) {
				console.error('error', 'registration could not be completed')
				resolve({error: 'registration could not be completed'})
			}

			resolve({ userId });

			reject(new Error('registration could not be completed'));

		})
	},
	login: (login) => {
		const loginError = 'login could not be completed';
		return new Promise((resolve, reject) => {
			if (!login) {
				console.error('error', loginError)
				resolve({error: loginError})
			}

			resolve({ jwt: 'dummy token',
				email: 'zzz@z.com',
				loginError: ''
			 });

			reject(new Error(loginError));

		})
	}
}

export default {
	Questions,
	Auth,
	//Tests,
}
