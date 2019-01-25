CREATE TABLE test(
	id 					SERIAL PRIMARY KEY,
	time_total  INTEGER,
	time_taken 	INTEGER NULL
	--user_id INTEGER,
	--FOREIGN KEY (user_id) REFERENCES fe_user(id)
);