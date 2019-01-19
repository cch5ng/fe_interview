#list of original questions
CREATE TABLE question(
	id 				SERIAL PRIMARY KEY,
	content 	TEXT,
	category 	VARCHAR(64),
	order 		INTEGER
);