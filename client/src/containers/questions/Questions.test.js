import React from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library';
import 'jest-dom/extend-expect';
import Questions from './Questions';
//import configureMockStore from 'redux-mock-store';
//import thunk from 'redux-thunk';

jest.mock('../../utils/http_requests');

function reducer(state = {tests: {}, questions: {}, auth: {}}, action) {
  //dont need any actions at the moment
  switch (action.type) {
    default:
      return state
  }
}

function renderWithRedux(
  ui,
  {initialState, store = createStore(reducer, initialState)} = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}

describe('Questions', () => {

	afterEach(cleanup);

	const initQuestions = {
	  questions: {
	    questions: {
	      "1": {
	        "id": 1,
	        "content": "How do you organize your code? (module pattern, classical inheritance?)",
	        "child_content": null,
	        "category": "JavaScript Questions",
	        "sort_order": 9
	      },
	      "2": {
	        "id": 2,
	        "content": "Explain why the following doesn't work as an IIFE: ^function foo(){ }();^.\n",
	        "child_content": "What needs to be changed to properly make it an IIFE?\n",
	        "category": "JavaScript Questions",
	        "sort_order": 4
	      },
	      "3": {
	        "id": 3,
	        "content": "Explain event delegation",
	        "child_content": null,
	        "category": "JavaScript Questions",
	        "sort_order": 0
	      }
	    }
	  }
	}

	it.skip('should render', () => {
		const {getByTestId, getByText} = renderWithRedux(<Questions />, {
			initialState: initQuestions
		})
		let questionHeadings = document.querySelectorAll('h3');
		expect(questionHeadings.length).toBeGreaterThan(0);

	})

})
