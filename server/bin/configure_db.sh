#!/bin/bash

echo 'Configuring front_end_interview'

dropdb front_end_interview
createdb front_end_interview

psql front_end_interview < ./bin/sql/user.sql
psql front_end_interview < ./bin/sql/question.sql
psql front_end_interview < ./bin/sql/question_list_custom.sql
psql front_end_interview < ./bin/sql/question_list_custom_question.sql

echo 'front_end_interview configured'