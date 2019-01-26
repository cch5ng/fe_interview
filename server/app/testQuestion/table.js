const pool = require('../../databasePool');

class TestQuestionTable {
	static storeTestQuestion({ test_id, question_id, question_completed, needs_review }) {

		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO test_question(test_id, question_id, question_completed, needs_review)
					VALUES($1, $2, $3, $4)`,
				[test_id, question_id, question_completed, needs_review],
				(err, resp) => {
					if (err) return reject(err);

					resolve();
				}
			)
		})
	}
}

module.exports = TestQuestionTable;
