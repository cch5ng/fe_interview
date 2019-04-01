# FE_Interview

## Purpose

* Initially this project is geared towards Front End Engineers preparing for a technical interview.

* It allows the user to simulate an online test with randomized questions and timer.

* Afterward the user can review the test and see a summary of the questions/topics which need to be reviewed further.

* This application does not provide correct answers or grading of the user's responses.

## Credits

* The main content for this application was sourced from this project: https://github.com/h5bp/Front-end-Developer-Interview-Questions

## Dependencies

Global installation of parcel. http://npmjs.com/package/parcel-bundler

## Setup (local/development)

**Install files**

* Root

`yarn install`

* Server

`cd server && yarn install`


* Client

`cd ../client && yarn install`


**Server setup**

* Convert questions from markdown source files to JavaScript.

`cd ../server && node test_md_to_json.js`


* Create the database (Postgres).

`yarn run configure`


* Copy environment variables file in server root directory.

`cp .env.example .env`


* Update server environment variables (in .env file). 

* Seed the database.

`node seed_db.js`


## Run

* API Server

`yarn run start`


* Client Server

`cd ../client && yarn run start`


From a browser, open http://localhost:1234


### To create a random test

* Click New Test

* Name test and select how many questions from each category to include

* At this time, it is expected that the user will take the test immediately after it is generated



## Test

* API Server

TODO; currently saved in postman

* Client (from /client directory)

`yarn run test`


## Deploy

* Notes in wiki for heroku deployment

## Credits

* The application structure (file organization) for the backend server application was copied from the teachings of David Joseph Katz in his Udemy course, Master Full Stack Web Developer (Node, SQL, React, ...)