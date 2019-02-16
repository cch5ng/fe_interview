const pool = require ('../../databasePool');
const TestQuestionTable = require ('../testQuestion/table');
const QuestionTable = require ('../question/table');
 
class TestTable {

	static storeTest(test) {
		const { name, date_taken, time_total, time_remaining, questions, status, user_id } = test; //user_id

		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO test(name, date_taken, time_total, time_remaining, status, user_id)
					VALUES($1, $2, $3, $4, $5, $6)
					RETURNING id`,
				[name, date_taken, time_total, time_remaining, status, user_id],
				(err, resp) => {
					if (err) return reject(err);

					const test_id = resp.rows[0].id;

					// TODO rethink this section
					Promise.all(
						test.questions.map(({ id, needs_review, status, sort_order }) => {
							return TestQuestionTable.storeTestQuestion({ test_id, question_id: id, needs_review, status, sort_order })
						})
					)
						.then(() => resolve({ test_id }))
						.catch(err => reject(err))
				}
			)
		})
	}

	static getAllTests({ email }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT test.id, test.time_total, test.time_remaining, test.name, test.date_taken, test.status, fe_user.email from test
					INNER JOIN fe_user ON test.user_id = fe_user.id
					WHERE fe_user.email = $1`,
				[email],
				(err, resp) => {
					if (err) return reject(err);

					const tests = resp.rows;

					Promise.all(
						tests.map(test => TestQuestionTable.getQuestionsByTestId({ test_id: test.id }))
					)
						.then(questions => {
							tests.forEach((test, idx) => {
								test.questions = questions[idx];
							})
							resolve(tests);
						})
						.catch(err => console.error('error', err))
				}
			)
		})
	}

	static getTestById( {id }) {
		let idNum = parseInt(id, 10);
		return Promise.all([
			new Promise((resolve, reject) => {
				pool.query(
					`SELECT test.name, test.date_taken, test.time_total, test.time_remaining, test.status from test
						WHERE id = $1
					`,
					[idNum],
					(err, resp) => {
						if (err) return reject(err);

						const test = resp.rows[0];
						resolve(test);
					}
				)
			}),

			new Promise((resolve, reject) => {
				pool.query(
					`SELECT test_question.needs_review, test_question.status, test_question.sort_order, test_question.response,
						question.id, question.content, question.child_content, question.category
						FROM test_question
						INNER JOIN question on test_question.question_id = question.id 
						WHERE test_question.test_id = $1
					`,
					[idNum],
					(err, resp) => {
						if (err) return reject(err);

						const questions = resp.rows;
						resolve(questions);
					}
				)
			})
		])
	}

	static updateTest({time_remaining, status, test_id}) {
		return new Promise((resolve, reject) => {
			pool.query(
				`UPDATE test
					SET time_remaining = $1, status = $2
					WHERE id = $3
					RETURNING id
				`,
				[time_remaining, status, test_id],
				(err, resp) => {
					if (err) return reject(err);

					resolve(resp.rows[0].id);
				}
			)
		})
	}

}

module.exports = TestTable;
