import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Tests from '../containers/tests/Tests';
import TestForm from '../containers/tests/TestForm';
import TestSummary from '../containers/tests/TestSummary';
import TestQuestion from '../containers/tests/TestQuestion';
import Questions from '../containers/questions/Questions';
import Registration from '../containers/auth/Registration';
import Login from '../containers/auth/Login';
import { fetchUpdateTest } from '../containers/tests/TestActions';
import styles from './App.css';
//import Nav from './Nav';

let cx = classNames.bind(styles);

class App extends Component {

  constructor(props) {
    super(props);

    this.counterIntervalId;
    this.startTime = 10000;

    const tests = props.tests && props.tests.tests ? props.tests.tests : null;

    this.state = {
      remainingTime: tests && tests.curTest.time_total ? tests.curTest.time_total : 0,
      mobileNavMenuDisplay: false,
    }

    this.startCountdownTimer = this.startCountdownTimer.bind(this);
    this.stopCountdownTimer = this.stopCountdownTimer.bind(this);
    this.updateCountdownStore = this.updateCountdownStore.bind(this);
    this.toggleNavMenuDisplay = this.toggleNavMenuDisplay.bind(this);
  }

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
    }

    if (this.state.remainingTime <= 0) {
      this.setState({ remainingTime: 0 }, () => {
        this.stopCountdownTimer({test_id: this.props.tests.curTest.id, status: 'completed'});
      });
    }
  }

  stopCountdownTimer({test_id, status}) {
    window.clearInterval(this.counterIntervalId);

    const time_remaining = this.state.remainingTime;
    this.props.dispatch(fetchUpdateTest({test_id, status, time_remaining}))
  }

  toggleNavMenuDisplay() {
    this.setState((state, props) => ({
      mobileNavMenuDisplay: !state.mobileNavMenuDisplay
    }));
  }

  render() {
    let headerClass = cx({
      [styles.fullHeight]: this.state.mobileNavMenuDisplay
    })

    let dropDownMenuClass = cx({
      [styles.dropDownMenu]: true,
      [styles.hidden]: !this.state.mobileNavMenuDisplay
    });

    let navAddTestIconClass = cx({
      [styles.navAddTestIcon]: true,
      [styles.hidden2]: this.state.mobileNavMenuDisplay
    });

    console.log('dropDownMenuClass', dropDownMenuClass)

    return (
      <Router>
        <div className="App">
          <header className={headerClass}>
            <nav>
              <div className={styles.navRow}>
                <div onClick={this.toggleNavMenuDisplay} className={styles.hamburger}>&#9776;</div>
                <div className={styles.logo}>
                  <Link to="/questions" className={styles.navLogo}>Front End Interview</Link>
                </div>
                <div className={styles.navLinksList}>
                  <Link to="/questions" className={styles.navLink}>Questions</Link>
                  <Link to="/tests" className={styles.navLink}>Tests</Link>
                  <Link to="/tests/new" className={styles.navLink}>New Test</Link>
                  <Link to="/login" className={styles.navLink}>Login</Link>
                </div>
                <div className={navAddTestIconClass}>
                  <Link to="/tests/new">&#8853;</Link>
                </div>
              </div>
              <div className={dropDownMenuClass}>
                <Link to="/questions"
                  onClick={this.toggleNavMenuDisplay}
                  className={styles.navLinkCol}>
                    Questions
                </Link>
                <Link to="/tests"
                  onClick={this.toggleNavMenuDisplay}
                  className={styles.navLinkCol}>
                    Tests
                </Link>
                <Link to="/tests/new"
                  onClick={this.toggleNavMenuDisplay}
                  className={styles.navLinkCol}>
                    New Test
                </Link>
                <Link to="/login"
                  onClick={this.toggleNavMenuDisplay}
                  className={styles.navLinkCol}>
                    Login
                </Link>
              </div>
            </nav>
          </header>

          <main>
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
          </main>
         

        </div>
      </Router>

    );
  }
}

function mapStateToProps(state) {
  return {
    tests: state.tests,
  }
}

export default connect(mapStateToProps)(App);
