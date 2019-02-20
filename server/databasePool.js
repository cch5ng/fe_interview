const { Pool } = require('pg');
let databaseConfiguration = {}

// TODO this section does not test locally well b/c when code executes, env var have not been loaded
// must test on production

//if (process.env.NODE_ENV === 'production') {

// 	databaseConfiguration = {	user: process.env.DB_USER,
// 		host: process.env.DB_HOST,
// 		database: process.env.DB_DATABASE,
// 		password: process.env.DB_PASSWORD,
// 		port: process.env.DB_PORT,
// 	}

// 	console.log('db', databaseConfiguration)
// } else {
	databaseConfiguration = require('./secrets/databaseConfiguration');
//}

const pool = new Pool(databaseConfiguration);

module.exports = pool;
