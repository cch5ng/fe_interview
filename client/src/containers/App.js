import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Tests from '../containers/tests/Tests';
import TestForm from '../containers/tests/TestForm';
import TestSummary from '../containers/tests/TestSummary';
import TestQuestion from '../containers/tests/TestQuestion';
import Questions from '../containers/questions/Questions';
import Registration from '../containers/auth/Registration';
import Login from '../containers/auth/Login';
import { fetchUpdateTest } from '../containers/tests/TestActions';
import './App.css';
//import Nav from './Nav';

class App extends Component {

  constructor(props) {
    super(props);

    this.counterIntervalId;
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
      console.log('this.state.remainingTime', this.state.remainingTime);      
    }

    if (this.state.remainingTime <= 0) {
      this.setState({ remainingTime: 0 }, () => {
        this.stopCountdownTimer({test_id: this.props.tests.curTest.id, status: 'completed'});
      });
    }
  }

  stopCountdownTimer({test_id, status}) {
    window.clearInterval(this.counterIntervalId);
    console.log('cleared interval');

    const time_remaining = this.state.remainingTime;
    this.props.dispatch(fetchUpdateTest({test_id, status, time_remaining}))
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <Link to="/questions" className="nav_link">Questions</Link>
            <Link to="/tests" className="nav_link">Tests</Link>
            <Link to="/tests/new" className="nav_link">New Test</Link>
            <Link to="/login" className="nav_link">Login</Link>
          </header>

          <Switch>

            <Route exact path="/questions" render={() => (
              <Questions />
            )} />

            <Route exact path="/tests" render={() => (
              <Tests />
            )} />

            <Route exact path="/tests/question/:id" render={({ match }) => (
              <TestQuestion match={match}
                remainingTime={this.state.remainingTime}
              />
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
   
            <Route exact path="/tests/:test_id" render={({ match }) => (
              <TestSummary match={match} />
            )} />

            <Route exact path="/register" render={() => (
              <Registration />
            )} />

            <Route exact path="/login" render={() => (
              <Login />
            )} />


          </Switch>          

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
