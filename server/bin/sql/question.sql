CREATE TABLE question(
	id 					SERIAL PRIMARY KEY,
	content 		TEXT,
	category 		VARCHAR(64),
	sort_order 	INTEGER
);