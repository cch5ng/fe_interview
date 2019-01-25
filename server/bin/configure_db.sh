#!/bin/bash

echo 'Configuring fe_interview_db'

dropdb -U fe_interview_user fe_interview_db
createdb -U fe_interview_user fe_interview_db

psql -U fe_interview_user fe_interview_db < ./bin/sql/fe_user.sql
psql -U fe_interview_user fe_interview_db < ./bin/sql/question.sql
psql -U fe_interview_user fe_interview_db < ./bin/sql/question_list_custom.sql
psql -U fe_interview_user fe_interview_db < ./bin/sql/question_list_custom_question.sql
psql -U fe_interview_user fe_interview_db < ./bin/sql/test.sql
psql -U fe_interview_user fe_interview_db < ./bin/sql/test_question.sql

echo 'fe_interview_db configured'