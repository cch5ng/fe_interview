const pool = require ('../../databasePool');
const TestQuestionTable = require ('../testQuestion/table');
 
class TestTable {

	static storeTest(test) {
		const { time_total, questions } = test; //user_id

		return new Promise((resolve, reject) => {
			// QuestionTable.getIdFromContent({ content })
				//.then(({ id }) => {

					pool.query(
						`INSERT INTO test(time_total)
							VALUES($1)
							RETURNING id`,
						[time_total],
						(err, resp) => {
							if (err) return reject(err);

							const test_id = resp.rows[0].id;

							Promise.all(
								test.questions.map(({ question_id, question_completed, needs_review }) => {
									return TestQuestionTable.storeTestQuestion({ test_id, question_id, question_completed, needs_review })
								})
							)
								.then(() => resolve({ test_id }))
								.catch(err => reject(err))
						}
					)

					//})
				//.catch()


		})
	}

	// static getAllTests() {
	// }

}

module.exports = TestTable;
