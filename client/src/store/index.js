import { combineReducers } from 'redux';
import { tests } from '../containers/tests/TestReducers';
import { questions } from '../containers/questions/QuestionReducers';

export default combineReducers({
  tests,
  questions
});
