CREATE TABLE test(
	id 					SERIAL PRIMARY KEY,
	name				VARCHAR(64),
	date_taken	TIMESTAMP,
	time_total  INTEGER,
	time_taken 	INTEGER NULL,
	status			VARCHAR(64)
	--user_id INTEGER,
	--FOREIGN KEY (user_id) REFERENCES fe_user(id)
);