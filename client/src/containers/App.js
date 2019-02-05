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

  constructor(props) {
    super(props);

    this.counterIntervalId;
    this.startTime = 10000;

    this.startCountdownTimer = this.startCountdownTimer.bind(this);
    this.updateCountdownStore = this.updateCountdownStore.bind(this);
  }

  // componentDidMount() {
  //   this.props.dispatch()
  // }

// EVENT HANDLERS
  startCountdownTimer() {
    console.log('gets to startCountdownTimer');
    // need to entire time (convert back to ms?)
    this.counterIntervalId = window.setInterval(this.updateCountdownStore, 1000)

  }

  updateCountdownStore() {
    if (this.startTime > 0) {
      this.startTime -= 1000;
      console.log('this.startTime', this.startTime);      
    }

    if (this.startTime === 0) {
      window.clearInterval(this.counterIntervalId);
      console.log('cleared interval');      
    }
  }

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
            <TestSummary startCountdownTimer={this.startCountdownTimer} />
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
