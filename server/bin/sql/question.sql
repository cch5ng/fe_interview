CREATE TABLE question(
	id 								SERIAL PRIMARY KEY,
	content 					TEXT,
	child_content 		TEXT,
	category 					VARCHAR(64),
	sort_order 				INTEGER
);