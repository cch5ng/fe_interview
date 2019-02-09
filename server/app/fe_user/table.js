const pool = require('../../databasePool');

class FEUserTable {

	static storeUser(user) {
		const { email, password} = user;
		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO fe_user(email, password)
					VALUES($1, $2)
					RETURNING id
				`,
				[email, password],
				(err, resp) => {
					if (err) return reject(err);

					const userId = resp.rows[0].id;
					resolve({ userId });
				}
			)
		})

	}

	static findByEmail(email) {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT id
					FROM fe_user
					WHERE email = $1`,
				[email],
				(err, resp) => {
					if (err) return reject(err);

					// TODO handle when user_id returns no results
					const user_id = resp.rows[0];
					resolve(user_id);
				}
			)
		})
	}
}

// test FEUserTable

const em = 'c@c.com'
FEUserTable.findByEmail(em)
	.then(userId => console.log('userId', userId))
	.catch(err => console.error('error', err));

module.exports = FEUserTable;
