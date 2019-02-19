
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

const Questions = {
	getAll: (p) => {
		return new Promise((resolve, reject) => {
			if (p) {
				reject(new Error('questions could not be retrieved'));
			}

			resolve(questionsData);
		})
	}
}

export default {
	Questions,
	//Auth,
	//Tests,
}