import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'
//import Nav from './Nav'
import './App.css';

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

          <Route exact path="/" render={() => (
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
