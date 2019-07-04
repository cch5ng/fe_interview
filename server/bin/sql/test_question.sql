CREATE TABLE test_question(
	test_id INTEGER,
	question_id INTEGER,
	needs_review BOOLEAN,
	status VARCHAR(64),
	sort_order INTEGER,
	response VARCHAR NULL,
	FOREIGN KEY (test_id) REFERENCES test(id),
	FOREIGN KEY (question_id) REFERENCES question(id)
);