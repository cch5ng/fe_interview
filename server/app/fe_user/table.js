const pool = require('../../databasePool');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class FEUserTable {

	static storeUser(user) {
		const { email, password} = user;

		return new Promise((resolve, reject) => {

			bcrypt.hash(password, saltRounds).then(function(hash) {

				pool.query(
					`INSERT INTO fe_user(email, password)
						VALUES($1, $2)
						RETURNING id
					`,
					[email, hash],
					(err, resp) => {
						if (err) return reject(err);

						const userId = resp.rows[0].id;
						resolve({ userId });
					}
				)
			})
		})
	}

	static findByEmail({email, password}) {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT id, password
					FROM fe_user
					WHERE email = $1`,
				[email],
				(err, resp) => {
					if (err) return reject(err);

					// TODO handle when user_id returns no results
					const user = resp.rows[0];
					let hash;

					if (user) {
						hash = user.password;

						bcrypt.compare(password, hash)
							.then(result => {
								if (!result) {resolve({})}
								if (result) { resolve({userId: user.id})}
							})
							.catch(berr => console.error('bcrypt err', berr))
					} else {
						resolve({});
					}
				}
			)
		})
	}
}

FEUserTable.findByEmail({email: emBad, password: 'pwd'})
	.then(userId => console.log('userId', userId))
	.catch(err => console.error('error', err));


module.exports = FEUserTable;
