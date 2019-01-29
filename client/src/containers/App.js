import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Tests from '../containers/tests/Tests';
import TestForm from '../containers/tests/TestForm';
//import Nav from './Nav';
//import './App.css';

class App extends Component {

  // componentDidMount() {
  //   this.props.dispatch()
  // }

// EVENT HANDLERS

  render() {
    return (
      <Router>
        <div className="App">
          {/* <Nav /> */}

          <Route exact path="/tests" render={() => (
            <Tests />
          )} />

          <Route exact path="/tests/new" render={() => (
            <TestForm />
          )} />

        </div>
      </Router>
    );
  }
}

function mapStateToProps({ }) {
  return {
  }
}

export default connect(mapStateToProps)(App);
