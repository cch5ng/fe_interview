const pool = require ('../../databasePool');
const TestQuestionTable = require ('../testQuestion/table');
const QuestionTable = require ('../question/table');
 
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

							// TODO rethink this section
							Promise.all(
								test.questions.map(({ question_id, question_completed, needs_review }) => {
									return TestQuestionTable.storeTestQuestion({ test_id, question_id, question_completed, needs_review })
								})
							)
								.then(() => resolve({ test_id }))
								.catch(err => reject(err))
						}
					)
		})
	}

	// TODO 012519
	static getAllTests() {
		// TODO 012619
		return Promise.all([
			// figure out how to get all tests
			// figure out how to get all questions for current test
			new Promise((resolve, reject) => {
				pool.query(
					`SELECT id, time_total, time_taken from test
						INNER JOIN test_question
						ON test_question.test_id = test.id
						INNER JOIN question
						ON question.id = test_question.question_id`,
					[],
					(err, resp) => {
						if (err) return reject(err);

						// need to do something with the resulting questions

						resolve(resp.rows);
					}
				)
			})

		])
	}

}

// test storeTest
// const test_ex = {
// 	time_total: 300000,
// 	questions: [
// 		{	content: 'Explain how ^this^ works in JavaScript',
// 			question_completed: false,
// 			needs_review: true,
// 			question_id: 2
// 		}
// 	]
// }

// TestTable.storeTest(test_ex)
// 	.then(test_id => { console.log('test_id', test_id) })
// 	.catch(err => console.error('error', err));

//test getAllTests()
TestTable.getAllTests()
	.then(tests => console.log('tests', tests))
	.catch(err => console.error('error', err));

module.exports = TestTable;
