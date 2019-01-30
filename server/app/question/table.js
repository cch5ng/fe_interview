// this is going to be similar to dragon/table file
// provide function that will use pg to make sql query to create records in question table (given data to populate)

// this file would eventually be called from api but to start would be called from the seed script

const pool = require('../../databasePool');

class QuestionTable {
	static storeQuestion(question) {
		const { content, child_content, sort_order, category } = question; //id, 

		return new Promise((resolve, reject) => {
			pool.query( ////id,
				`INSERT INTO question(content, child_content, sort_order, category) 
					VALUES($1, $2, $3, $4) RETURNING id`, //, $4
				[content, child_content, sort_order, category], //id, 
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

// test getQuestionsByCategory
// QuestionTable.getQuestionsByCategory({ category: 'Fun Questions'})
// 	.then(questions => console.log('Fun questions', questions))
// 	.catch(err => console.error('error', err));

// test getAllQuestions
// QuestionTable.getAllQuestions()
// 	.then(questions => console.log('All questions', questions))
// 	.catch(err => console.error('error', err));

// test getQuestionIdByContent()
// QuestionTable.getQuestionIdByContent({ content: 'Explain how ^this^ works in JavaScript'})
// 	.then(id => console.log('id', id))
// 	.catch(err => console.error('error', err));

// test getRandomQuestionsByCategoryCounts
// QuestionTable.getRandomQuestionsByCategoryCounts({"JavaScript Questions": 5, "Fun Questions": 3})
// 	.then(questions => console.log('random questions', questions))
// 	.catch(err => console.error('error', err));

module.exports = QuestionTable;