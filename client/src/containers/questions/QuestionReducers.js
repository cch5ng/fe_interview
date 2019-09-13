/**
 * @prettier
 */

import {
  REQUEST_ALL_QUESTIONS,
  RECEIVE_ALL_QUESTIONS,
} from './QuestionActions';

export function questions(state = {}, action) {
  switch (action.type) {
    case REQUEST_ALL_QUESTIONS:
      return {
        ...state,
        retrieving: action.retrieving,
      };
    case RECEIVE_ALL_QUESTIONS:
      let questionObj = {};
      action.questions.forEach(question => {
        let id = question.id;
        questionObj[id] = question;
      });
      return {
        ...state,
        questions: questionObj,
        retrieving: false,
      };
    default:
      return state;
  }
}
