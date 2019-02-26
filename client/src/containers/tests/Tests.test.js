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
import Tests from './Tests';
import 'react-testing-library/cleanup-after-each';

jest.mock('../../utils/http_requests');

const middlewares = [thunk]; 

function reducer(state = { }, action) {
  switch (action.type) {
    case 'RECEIVE_ALL_TESTS':
      return {
        ...state,
        tests: {
        	tests: action.tests
        }
      }
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
    ...render(<Provider store={store}><Router history={history}>{ui}</Router></Provider>),
    store,
  }
}

describe('Tests', () => {

	afterEach(cleanup);

  describe('get all tests', () => {
    it('should render', async () => {
      const {getByTestId, getAllByTestId} = renderWithReduxAndRouter(<Tests />, {
        initialState: {tests: {}, auth: {email: 'testing@m.com'}}
      })

      let testReturned = await waitForElement(() => getByTestId('test-item'));

      let tests = getAllByTestId('test-item');
      expect(tests.length).toBe(3);
    })
  })

})
