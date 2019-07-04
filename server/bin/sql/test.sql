CREATE TABLE test(
	id SERIAL PRIMARY KEY,
	name VARCHAR(64),
	date_taken DATE,
	time_total INTEGER NULL,
	time_remaining INTEGER NULL,
	status VARCHAR(64),
	user_id INTEGER,
	FOREIGN KEY (user_id) REFERENCES fe_user(id)
);