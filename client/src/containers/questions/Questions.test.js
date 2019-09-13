/**
 * @prettier
 */

import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  waitForDomChange,
  getByTestId,
  wait,
  getAllByTestId,
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import thunk from 'redux-thunk';
import Questions from './Questions';
import 'react-testing-library/cleanup-after-each';

jest.mock('../../utils/http_requests');

const middlewares = [thunk];

function reducer(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_ALL_QUESTIONS':
      return {
        ...state,
        questions: {
          questions: action.questions,
        },
      };
    default:
      return state;
  }
}

function renderWithRedux(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState, compose(applyMiddleware(thunk))),
  } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}

describe('Questions', () => {
  afterEach(cleanup);

  it('should render', async () => {
    const { getByTestId, getAllByTestId } = renderWithRedux(<Questions />, {
      initialState: { questions: {} },
    });

    let questionReturned = await waitForElement(() =>
      getByTestId('question-item')
    );

    let question = getByTestId('question-item');
    expect(question).not.toBeNull();
    let questions = getAllByTestId('question-item');
    expect(questions.length).toBe(2);
  });
});
