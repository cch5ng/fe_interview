const { Pool } = require('pg');
let databaseConfiguration = {}
let connectionString;
let pool;

// TODO this section does not test locally well b/c when code executes, env var have not been loaded
// must test on production

if (process.env.NODE_ENV === 'production') {

	connectionString = process.env.DATABASE_URL;
	pool = new Pool({ connectionString });

	// databaseConfiguration = {	user: process.env.DB_USER,
	// 	host: process.env.DB_HOST,
	// 	database: process.env.DB_DATABASE,
	// 	password: process.env.DB_PASSWORD,
	// 	port: process.env.DB_PORT,
	// }

} else {
	databaseConfiguration = require('./secrets/databaseConfiguration');
	pool = new Pool(databaseConfiguration);
}

module.exports = pool;
