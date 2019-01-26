CREATE TABLE test_question(
	test_id INTEGER,
	question_id INTEGER,
	question_completed BOOLEAN,
	needs_review BOOLEAN,
	FOREIGN KEY (test_id) REFERENCES test(id),
	FOREIGN KEY (question_id) REFERENCES question(id)
);