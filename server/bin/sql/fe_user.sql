CREATE TABLE fe_user(
	id					SERIAL PRIMARY KEY,
	email 			VARCHAR(64),
	password 		VARCHAR(64),
	user_name 	VARCHAR(64),
	created_at 	TIMESTAMP NOT NULL DEFAULT NOW()
);