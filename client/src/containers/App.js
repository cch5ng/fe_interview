import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Tests from '../containers/tests/Tests';
import TestForm from '../containers/tests/TestForm';
import TestSummary from '../containers/tests/TestSummary';
import TestQuestion from '../containers/tests/TestQuestion';
import Questions from '../containers/questions/Questions';
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

          <Route exact path="/questions" render={() => (
            <Questions />
          )} />

          <Route exact path="/tests" render={() => (
            <Tests />
          )} />

          <Route exact path="/tests/new" render={() => (
            <TestForm />
          )} />

          <Route exact path="/tests/current" render={() => (
            <TestSummary />
          )} />

          <Route exact path="/tests/question/:id" render={({ match }) => (
            <TestQuestion match={match} />
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
