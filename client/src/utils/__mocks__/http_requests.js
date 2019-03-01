
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

const testsList = [
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
								status: "not_visited",	
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
					},
					{
						date_taken: "2019-02-20T08:00:00.000Z",
						email: "d@d.com",
						id: 26,
						name: "d's test xx",
						questions: [
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
					},
					{
						date_taken: "2019-02-22T08:00:00.000Z",
						email: "d@d.com",
						id: 27,
						name: "d's test xxx",
						questions: [
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
				];

const testDetail = {
	date_taken: "2019-02-21T08:00:00.000Z",
	name: "test example 15",
	questions: [
		{
			category: "General Questions",
			child_content: null,
			content: "gen question",
			id: 10,
			needs_review: null,
			response: "",
			sort_order: 0,
			status: "skipped"
		},
		{
			category: "Coding Questions",
			child_content: null,
			content: "coding question",
			id: 14,
			needs_review: null,
			response: "",
			sort_order: 1,
			status: "skipped"
		}
	],
	status: "completed",
	time_remaining: 1191000,
	time_total: 1200000
}

const Tests = {
	getAll: ({email}) => {
		return new Promise((resolve, reject) => {
			if (!email) {
				resolve({tests: {}, testError: 'No tests were found'})
				//reject(new Error('user tests could not be retrieved'));
			}

			resolve({tests: testsList});
		})		
	},
	getTestById: ({id}) => {
		return new Promise((resolve, reject) => {
			console.log('id', id)
			if (!id) {
				resolve({error: 'test could not be retrieved'})
				//reject(new Error('test could not be retrieved'));
			}

			resolve(testDetail);
		})		
	},
	initializeTest: (testData) => {
		return new Promise((resolve, reject) => {
			if (!testData) {
				resolve({error: 'test could not be saved'})
			}

			resolve({test_id: 9999});
		})				
	},
	updateTestQuestion: (questionData) => {
		return new Promise((resolve, reject) => {
			if (!questionData) {
				resolve({error: 'question could not be updated'})
			}

			resolve({ question_id: 40, response: "a very precise and concise answer", question_status:"completed" });
		})				
	}
}

export default {
	Questions,
	Auth,
	Tests,
}
