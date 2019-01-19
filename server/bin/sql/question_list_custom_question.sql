CREATE TABLE question_list_custom_question(
	id 												SERIAL PRIMARY KEY,
	sort_order 								INTEGER,
	question_list_custom_id 	INTEGER,
	question_id 							INTEGER,
	FOREIGN KEY (question_list_custom_id) REFERENCES question_list_custom(id), 
	FOREIGN KEY (question_id) REFERENCES question(id)
);