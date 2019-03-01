import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import {Provider, connect} from 'react-redux';
import { Router } from 'react-router-dom';
import {render, fireEvent, cleanup, waitForElement,
	getByTestId, wait, getAllByTestId} from 'react-testing-library';
import 'jest-dom/extend-expect';
import thunk from 'redux-thunk';
import { withRouter } from 'react-router';
import { createMemoryHistory } from 'history';
import TestQuestion from './TestQuestion';
import 'react-testing-library/cleanup-after-each';

jest.mock('../../utils/http_requests');

const middlewares = [thunk]; 

function reducer(state = { }, action) {
  switch (action.type) {
    default:
      return state
  }
}

function renderWithReduxAndRouter(
  ui,
  { initialState,
    store = createStore(reducer,
                        initialState,
                        compose(applyMiddleware(thunk))
                        ),
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(<Provider store={store}><Router history={history} store={store}>{ui}</Router></Provider>),
    store,
    history
  }
}

describe('TestQuestion', () => {

	afterEach(cleanup);

  const initTests = {
    tests: {
    },
    curTest: {
      name: 'd\'s test 0228 aaaaa',
      questions: {
        '97': {
          id: 97,
          content: 'Talk about the British museum',
          child_content: null,
          category: 'General Questions',
          sort_order: 1,
          status: 'skipped',
          response: ''
        },
        '99': {
          id: 99,
          content: 'Can you describe ',
          child_content: null,
          category: 'General Questions',
          sort_order: 3,
          status: 'completed',
          response: 'asd'
        }
      },
      time_total: 1800000,
      status: 'active',
      email: 'testing@m.com',
      date_taken: '2019-02-28',
      id: 7
    }
  }

  //issue appears correct actions get called but maybe store does not get updated or test is timing out too fast?
  it('should render', async () => {
    let match = {params: {id: '97'}}

    const {container, getByTestId} = renderWithReduxAndRouter(<TestQuestion match={match} />, {
        initialState: {tests: initTests, auth: {email: 'testing@m.com'}},
        route: '/tests/question/97'
    })

    //let questionDetailContent = await waitForElement(() => getByTestId('questionDetailContent'));
    expect(container.innerHTML).toContain('British museum');
  })

})
