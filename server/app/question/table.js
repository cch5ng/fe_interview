// this is going to be similar to dragon/table file
// provide function that will use pg to make sql query to create records in question table (given data to populate)

// this file would eventually be called from api but to start would be called from the seed script

const pool = require('../../databasePool');

class QuestionTable {
	static storeQuestion(question) {
		const { content, child_content, sort_order } = question; //id, 

		return new Promise((resolve, reject) => {
			pool.query( ////id,
				`INSERT INTO question(content, child_content, sort_order) 
					VALUES($1, $2, $3) RETURNING id`, //, $4
				[content, child_content, sort_order], //id, 
				(err, resp) => {
					if (err) return reject(err);

					const questionId = resp.rows[0].id;
					resolve({ questionId });
				}
			)
		})
	}
}

module.exports = QuestionTable;