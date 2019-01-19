# custom list that user creates for testing
CREATE TABLE question_list_custom(
	id SERIAL PRIMARY KEY,
	name VARCHAR(64),
	user_id INTEGER,
	FOREIGN KEY (user_id) REFERENCES user(id)
);