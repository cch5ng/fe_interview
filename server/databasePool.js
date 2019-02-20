const { Pool } = require('pg');
const databaseConfiguration = {
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
}

const pool = new Pool(databaseConfiguration);

module.exports = pool;
