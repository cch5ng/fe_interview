CREATE TABLE question(
	id SERIAL PRIMARY KEY,
	content VARCHAR,
	child_content VARCHAR NULL,
	category VARCHAR(64),
	sort_order INTEGER
);