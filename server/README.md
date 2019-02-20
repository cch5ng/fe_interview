# FE_Interview Server

## Purpose

## Dependencies

Global installation of parcel. http://npmjs.com/package/parcel-bundler

## Setup (local)

Install server files.

`yarn install`

Convert questions from markdown source files to JavaScript.

`node test_md_to_json.js`

Create the database (Postgres).

Copy environment variables file in server root directory.

`cp .env.example .env`

Update server environment variables (in .env file). 

Seed the database.

`node seed_db.js`

## Run

Start the server.

`yarn run start`

## Test

## Deploy??

## Credits

* The application structure (file organization) for the backend server application was copied from the teachings of David Joseph Katz in his Udemy course, Master Full Stack Web Developer (Node, SQL, React, ...)