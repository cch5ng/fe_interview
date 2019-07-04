# FE_Interview

## Purpose

* Initially this project is geared towards Front End Engineers preparing for a technical interview.

* It allows the user to simulate an online test with randomized questions and timer.

* Afterward the user can review the test and see a summary of the questions/topics which need to be reviewed further.

* This application does not provide correct answers or grading of the user's responses.


## Credits

* The main content for this application was sourced from this project: https://github.com/h5bp/Front-end-Developer-Interview-Questions


## Dependencies

* PosgreSQL should be installed locally (v10.5+). https://www.postgresql.org/

* Parcel is used to bundle and build the Front End files. It should be installed globally. http://npmjs.com/package/parcel-bundler


## Database Setup

1 Create a database named `fe_interview_db`.

2 Create a database user with admin rights for the new database (read, create, update, delete). Record the user's password.


## Setup (local/development)

### Install files

1 Install root-level files.

`yarn install`


2 Install back-end files.

`cd server && yarn install`


3 Install front-end files.

`cd ../client && yarn install`


### Server setup

1 Convert questions from markdown source files to JavaScript.

`cd ../server && node test_md_to_json.js`


2 Create the database (Postgres).

`yarn run configure`


3 Copy environment variables file in server root directory.

`cp .env.example .env`


* `JWT_SECRET`: to be used as a salt to encrypt strings used in authentication; this can be an arbitrary string, preferably complex

* `DB_USER`: the user name for fe_interview_db database

* `DB_PASSWORD`: the password for `DB_USER`


4 Update server environment variables (in .env file). 


5 Seed the database.

`node seed_db.js`


## Run the servers

1 Start the back-end server.

`yarn run start`


2 Start the front-end server.

`cd ../client && yarn run start`


3 From a browser, open http://localhost:1234


## Automated Tests

### Front-end 

* Run from the /client directory


1 `yarn run test`


## Using the Application

### To create a random front-end interview test

1 Click **New Test**.

2 Name the test and select how many questions from each category to include.

3 At this time, it is expected that the user will take the test immediately after it is generated.


## Deploy

* Notes in wiki for heroku deployment

## Credits

* The application structure (file organization) for the backend server application was copied from the teachings of David Joseph Katz in his Udemy course, Master Full Stack Web Developer (Node, SQL, React, ...)