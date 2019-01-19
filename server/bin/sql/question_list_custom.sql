CREATE TABLE question_list_custom(
	id SERIAL PRIMARY KEY,
	name VARCHAR(64),
	user_id INTEGER,
	FOREIGN KEY (user_id) REFERENCES fe_user(id)
);