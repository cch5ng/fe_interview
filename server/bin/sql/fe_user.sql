CREATE TABLE fe_user(
	id				SERIAL PRIMARY KEY,
	email 		VARCHAR(64),
	password 	VARCHAR(64),
	name 			VARCHAR(64)
);