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

	static updateTestQuestion(testData) { //{ test_id, question_id, response	}
		console.log('gets to updateTestQuestion');
		const { test_id, question_id, response	} = testData;
		return new Promise((resolve, reject) => {
			pool.query(
				`UPDATE test_question
					SET response = $1
					WHERE test_id = $2 AND question_id = $3
					RETURNING question_id`,
				[response, test_id, question_id],
				(err, resp) => {
					if (err) return reject(err);
	
					const question_id = resp.rows[0].question_id;
					console.log('resp', resp.rows[0].question_id);
					resolve(question_id);
//					resolve();
				}
			)
		})
	}

}

module.exports = TestQuestionTable;
