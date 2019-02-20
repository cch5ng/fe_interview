import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import App from './containers/App';
import appStore from './store/index.js';
//import './index.css'
//import { render } from 'react-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(appStore,
  composeEnhancers(
    applyMiddleware(ReduxThunk)
  )
)

ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));

// render(
// 	<div>My app</div>,
// 	document.getElementById('root')
// );
