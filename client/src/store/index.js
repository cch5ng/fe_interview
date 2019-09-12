/**
 * @prettier
 */

import { combineReducers } from 'redux';
import { tests } from '../containers/tests/TestReducers';
import { questions } from '../containers/questions/QuestionReducers';
import { auth } from '../containers/auth/AuthReducers';

export default combineReducers({
  tests,
  questions,
  auth,
});
