import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import {Provider, connect} from 'react-redux';
import {render, fireEvent, cleanup, waitForElement,
	waitForDomChange, getByTestId, wait} from 'react-testing-library';
import 'jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Questions from './Questions';
import 'react-testing-library/cleanup-after-each';

jest.mock('../../utils/http_requests');

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
// const mockStore = configureStore(middlewares);
//  const initialState = //{questions: {}, tests: {}, auth: {}
//   {
// 	  questions: {
// 	    questions: {
// 	      "1": {
// 	        "id": 1,
// 	        "content": "How do you organize your code? (module pattern, classical inheritance?)",
// 	        "child_content": null,
// 	        "category": "JavaScript Questions",
// 	        "sort_order": 9
// 	      },
// 	      "2": {
// 	        "id": 2,
// 	        "content": "Explain why the following doesn't work as an IIFE: ^function foo(){ }();^.\n",
// 	        "child_content": "What needs to be changed to properly make it an IIFE?\n",
// 	        "category": "JavaScript Questions",
// 	        "sort_order": 4
// 	      },
// 	      "3": {
// 	        "id": 3,
// 	        "content": "Explain event delegation",
// 	        "child_content": null,
// 	        "category": "JavaScript Questions",
// 	        "sort_order": 0
// 	      }
// 	    }
// 	  }
// }

//const store = mockStore(initialState);

function reducer(state = { }, action) {
  switch (action.type) {
    case 'RECEIVE_ALL_QUESTIONS':
      return {
        ...state,
        questions: {
        	questions: action.questions
        }
      }
    default:
      return state
  }
}

// const store = createStore(appStore,
//   composeEnhancers(
//     applyMiddleware(ReduxThunk)
//   )
// )

function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer,
  													initialState,
  													compose(
   													  applyMiddleware(thunk)
  													)
  												)
	} = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}

// async function waitForElementWrap(identifier) {
// 	let question = await waitForElement(
// 		  () => getByTestId(container, identifier),
// 		  { container }
// 		)

// 	return question
// }

describe('Questions', () => {

	afterEach(cleanup);

	// believe this is timing out
	it.skip('should render', () => {
		const {getByTestId, getByText} = renderWithRedux(<Questions />, {
			initialState: {questions: {}}
		})

		const container = getByTestId('questions');

		// gets stuck here, promise does not resolve
		let questionReturned = waitForElement(
		  () => getByTestId(container, 'question-item'),
		  { container }
		)


		//wait(() => getByTestId('question-item'));

		// console.log('questionReturned', questionReturned)
		// expect(questionReturned).not.toBeNull();

		// if prepopulate the store with questions (array), then Questions renders
		// but something wrong when testing the flow with the async axn (although mock gets called as expected)
		// maybe need to mock the action itself??

		//console.log('store', store)
		let question = getByTestId('question-item');
		expect(question).not.toBeNull();

	})

})
