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

	// static getAllQuestions() {
	// }

}

module.exports = QuestionTable;