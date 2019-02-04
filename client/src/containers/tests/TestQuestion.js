import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class TestQuestion extends Component {

	constructor(props) {
		super(props);

		this.state = {
			questionSubmitted: false
		};

		this.updateTest = this.updateTest.bind(this);
		this.submitQuestion = this.submitQuestion.bind(this);
		this.handleInputUpdate = this.handleInputUpdate.bind(this);
	}

	componentDidMount() {
		//this.props.dispatch(fetchQuestions());
	}

	//event handlers
	handleInputUpdate(ev) {

	}

	updateTest() {

	}

	submitQuestion(ev) {
		ev.preventDefault();
		console.log('gets to submitQuestion');
		this.setState({ questionSubmitted: true })

		this.props.history.push('/tests/current');
	}

	render() {
		if (this.props.match) {
			console.log('id', this.props.match.params.id);
		}

		// let curTestObj = this.props.tests && this.props.tests.curTest ? this.props.tests.curTest : null;
		// let status = curTestObj && curTestObj.status ? curTestObj.status : 'initialized';
		// let questionsAr = [];
		// let questionsMaxObj = {};

		// if (questionObj) {
		// 	questionsAr = Object.keys(questionObj).map(k => questionObj[k]);
		// 	questionsMaxObj = this.getQuestionCountPerCategory(questionsAr, questionCategories);
		// }

		return (
			<div>
				<h1>Test Question</h1>

				<button onClick={this.submitQuestion} >Submit</button>


{/*
				{curTestObj && (
					<div>
						<h2>Name {curTestObj.name}</h2>
						<p>Total time {curTestObj.time_total}</p>
					</div>
				)}
				{status === 'initialized' && (
					<button onClick={this.startTest} >Start</button>
				)}

				{status === 'active' && (
				)}
*/}
			</div>
		)
	}
}

function mapStateToProps({ tests }) {
	return {
		tests
	}
}

export default withRouter(connect(mapStateToProps)(TestQuestion));
