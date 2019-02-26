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
import TestSummary from './TestSummary';
import 'react-testing-library/cleanup-after-each';

jest.mock('../../utils/http_requests');

const middlewares = [thunk]; 

function reducer(state = { }, action) {
  switch (action.type) {
    case 'RECEIVE_TEST_DETAIL':
      console.log('gets here')
      return {
        ...state,
        tests: {...state.tests,
           curTest: action.curTest
        }
      }
    default:
      return state
  }
}

// function renderWithRedux(
//   ui,
//   { initialState, store = createStore(reducer,
//                             initialState,
//                             compose(
//                               applyMiddleware(thunk)
//                             )
//                           )
//   } = {}
// ) {
//   return {
//     ...render(<Provider store={store}>{ui}</Provider>),
//     // adding `store` to the returned utilities to allow us
//     // to reference it in our tests (just try to avoid using
//     // this to test implementation details).
//     store,
//   }
// }


function renderWithReduxAndRouter(
  ui,
  { initialState,
    store = createStore(reducer,
                        initialState,
                        compose(applyMiddleware(thunk))
                        ),
    route = '/tests/15',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(<Provider store={store}><Router history={history} >{ui}</Router></Provider>),
    store,
  }
}

describe('TestSummary', () => {

	afterEach(cleanup);

  describe('get test by id', () => {

    //issue appears correct actions get called but maybe store does not get updated or test is timing out too fast?
    it('should render', async () => {
      const {getByTestId} = renderWithReduxAndRouter(<TestSummary />, {
        initialState: {tests: {}, auth: {email: 'testing@m.com'}}
      })

      let testReturned = await waitForElement(() => getByTestId('curTest'));
      expect(testReturned).not.toBeNull();
    })
  })

})
