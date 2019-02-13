const pool = require('../../databasePool');

class QuestionTable {
	static storeQuestion(question) {
		const { content, child_content, sort_order, category } = question; 

		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO question(content, child_content, sort_order, category) 
					VALUES($1, $2, $3, $4) RETURNING id`,
				[content, child_content, sort_order, category], 
				(err, resp) => {
					if (err) return reject(err);

					const questionId = resp.rows[0].id;
					resolve({ questionId });
				}
			)
		})
	}

	static getAllQuestions() {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT * from question
					ORDER BY category, sort_order`,
				[],
				(err, resp) => {
					if (err) return reject(err);

					resolve(resp.rows);
				}
			)
		})
	}

	static getQuestionsByCategory({ category }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT * from question
					WHERE category = $1`,
				[ category ],
				(err, resp) => {
					if (err) return reject(err);

					resolve(resp.rows);
				}
			)
		})
	}

//TODO test this 012919
	static getRandomQuestionsByCategoryCounts(categoryCountsObj) {

		// TODO check if the nesting works; feel like there are too many resolve/rejects here
		return Promise.all(Object.keys(categoryCountsObj).map(category => {
			return new Promise((resolve, reject) => {
				pool.query(
					`SELECT * 
						FROM question
						WHERE category = $1
						ORDER BY random()
						LIMIT $2;`,
					[category, categoryCountsObj[category]],
					(err, resp) => {
						if (err) return reject(err);

						resolve(resp.rows)
					}
				)
			})
		}))			
	}

	// not sure how to make this work because of excess promise nesting
	static getQuestionIdByContent( { content }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT id from question
					WHERE content = $1`,
				[content],
				(err, resp) => {
					if (err) return reject(err);

					const questionId = resp.rows[0].id;

					resolve(questionId);
				}
			)
		})
	}
}

module.exports = QuestionTable;