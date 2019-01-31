const pool = require('../../databasePool');

class TestQuestionTable {

	static storeTestQuestion({ test_id, question_id, question_completed, needs_review, status, sort_order }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO test_question(test_id, question_id, question_completed, needs_review, status, sort_order)
					VALUES($1, $2, $3, $4, $5, $6)`,
				[test_id, question_id, question_completed, needs_review, status, sort_order],
				(err, resp) => {
					if (err) return reject(err);

					resolve();
				}
			)
		})
	}

	// needs to return at least the question id and question content
	static getQuestionsByTestId({ test_id }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT question.id, question.content, test_question.question_completed, test_question.needs_review from test_question
					INNER JOIN question 
					ON question.id = test_question.question_id
					WHERE test_question.test_id = $1`,
				[test_id],
				(err, resp) => {
					if (err) return reject(err);

					console.log('questions', resp.rows);

					resolve(resp.rows);
				}
			);
		});
	}

}

module.exports = TestQuestionTable;
