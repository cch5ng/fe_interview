const pool = require('../../databasePool');

class FEUserTable {

	static findByUserName(username) {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT id
					FROM fe_user
					WHERE user_name = $1`,
				[username],
				(err, resp) => {
					if (err) return reject(err);

					const user_id = resp.rows[0];
					resolve(user_id);
				}
			)
		})
	}

}

module.exports = FEUserTable;
