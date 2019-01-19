#!/bin/bash

echo 'Configuring fe_interview_db'

dropdb fe_interview_db
createdb fe_interview_db

psql fe_interview_db < ./bin/sql/fe_user.sql
psql fe_interview_db < ./bin/sql/question.sql
psql fe_interview_db < ./bin/sql/question_list_custom.sql
psql fe_interview_db < ./bin/sql/question_list_custom_question.sql

echo 'fe_interview_db configured'