import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Tests from '../containers/tests/Tests';
import TestForm from '../containers/tests/TestForm';
import TestSummary from '../containers/tests/TestSummary';
import TestQuestion from '../containers/tests/TestQuestion';
import Questions from '../containers/questions/Questions';
import { decrementTestTimeRemaining } from '../containers/tests/TestActions';
//import Nav from './Nav';
//import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.counterIntervalId = 0;
    this.startTime = 10000;

    const tests = props.tests && props.tests.tests ? props.tests.tests : null;
    console.log('App tests', tests);

    this.state = {
      remainingTime: tests && tests.curTest.time_total ? tests.curTest.time_total : 0 
    }

    this.startCountdownTimer = this.startCountdownTimer.bind(this);
    this.stopCountdownTimer = this.stopCountdownTimer.bind(this);
    this.updateCountdownStore = this.updateCountdownStore.bind(this);
  }

  // componentDidMount() {
  //   this.props.dispatch()
  // }

// EVENT HANDLERS
/* App React state time_remaining
  startCountdownTimer(remainingTime) {
    console.log('gets to startCountdownTimer');
    // need to entire time (convert back to ms?)
    this.setState({ remainingTime });
    this.counterIntervalId = window.setInterval(this.updateCountdownStore, 1000)

  }

  updateCountdownStore() {
    if (this.startTime > 0) {
      this.setState((curState) => {
        return { remainingTime: curState.remainingTime - 1000 }
      })
      //this.startTime -= 1000;
      console.log('this.state.remainingTime', this.state.remainingTime);      
    }

    if (this.state.remainingTime <= 0) {
      window.clearInterval(this.counterIntervalId);
      console.log('cleared interval');      
    }
  }

  stopCountdownTimer() {
      window.clearInterval(this.counterIntervalId);
      console.log('cleared interval');      
  }
*/

/* Redux store time_remaining */
  startCountdownTimer() {
    console.log('gets to startCountdownTimer');
    // need to entire time (convert back to ms?)
    this.counterIntervalId = window.setInterval(this.updateCountdownStore(), 1000)
  }

  updateCountdownStore() {
    let time_remaining = this.props.tests && this.props.tests.curTest ? this.props.tests.curTest.time_remaining : 0;
    console.log('time_remaining', time_remaining);

    if (time_remaining > 0) {
      this.props.dispatch(decrementTestTimeRemaining());
      console.log('time_remaining', time_remaining);
    } else {
      this.stopCountdownTimer();
    }
  }

  stopCountdownTimer() {
      window.clearInterval(this.counterIntervalId);
      console.log('cleared interval');      
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
            <TestSummary startCountdownTimer={this.startCountdownTimer}
              remainingTime={this.state.remainingTime}
              stopCountdownTimer={this.stopCountdownTimer}
            />
          )} />

          <Route exact path="/tests/question/:id" render={({ match }) => (
            <TestQuestion match={match}
              remainingTime={this.state.remainingTime}
            />
          )} />


        </div>
      </Router>
    );
  }
}

function mapStateToProps({ tests }) {
  return {
    tests
  }
}

export default connect(mapStateToProps)(App);
