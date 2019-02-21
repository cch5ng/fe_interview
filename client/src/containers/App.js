import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
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
//import globalStyles from '../css/globalStyles.css'
//import Nav from './Nav';

// let styles = {};
// Object.assign(styles, appStyles, globalStyles);
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
    this.createMarkupPlusIcon = this.createMarkupPlusIcon.bind(this);
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

  createMarkupPlusIcon() {
    return {__html: '&#8853;'};
  }


  render() {
    let headerClass = cx({
      [styles.fullHeight]: this.state.mobileNavMenuDisplay
    });

    let dropDownMenuClass = cx({
      [styles.dropDownMenu]: true,
      [styles.hidden]: !this.state.mobileNavMenuDisplay
    });

    let navAddTestIconClass = cx({
      [styles.navAddTestIcon]: true,
      [styles.hidden2]: this.state.mobileNavMenuDisplay
    });

    return (
      <Router>
        <div className="App">
          <header className={headerClass}>
            <nav>
              <div className={styles.navRow}>
                <div onClick={this.toggleNavMenuDisplay} className={styles.hamburger}>
                  ☰
                </div>
                <div className={styles.logo}>
                  <NavLink to="/questions" className={styles.navLogo}>Front End Interview</NavLink>
                </div>
                <div className={styles.navLinksList}>
                  <NavLink to="/questions" className={styles.navLink}>Questions</NavLink>
                  <NavLink to="/tests" className={styles.navLink}>Tests</NavLink>
                  <NavLink to="/tests/new" className={styles.navLink}>New Test</NavLink>
                  <NavLink to="/login" className={styles.navLink}>Login</NavLink>
                </div>
                <NavLink to="/tests/new">
                  <div className={navAddTestIconClass}
                    dangerouslySetInnerHTML={this.createMarkupPlusIcon()}>
                  </div>
                </NavLink>
              </div>
              <div className={dropDownMenuClass}>
                <NavLink to="/questions"
                  onClick={this.toggleNavMenuDisplay}
                  className={styles.navLinkCol}>
                    Questions
                </NavLink>
                <NavLink to="/tests"
                  onClick={this.toggleNavMenuDisplay}
                  className={styles.navLinkCol}>
                    Tests
                </NavLink>
                <NavLink to="/tests/new"
                  onClick={this.toggleNavMenuDisplay}
                  className={styles.navLinkCol}>
                    New Test
                </NavLink>
                <NavLink to="/login"
                  onClick={this.toggleNavMenuDisplay}
                  className={styles.navLinkCol}>
                    Login
                </NavLink>
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

              <Route exact path="/" render={() => (
                <Questions />
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
