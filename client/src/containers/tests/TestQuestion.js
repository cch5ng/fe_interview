import React, { Component } from 'react';
import { connect } from 'react-redux';

class TestQuestion extends Component {

	constructor(props) {
		super(props);

		// this.state = {
		// };

		this.updateTest = this.updateTest.bind(this);
	}

	componentDidMount() {
		//this.props.dispatch(fetchQuestions());
	}

	//event handlers
	updateTest() {

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
					<button onClick={this.submitTest} >Submit</button>
				)}
*/}
			</div>
		)
	}
}

function mapStateToProps({ tests }) {
	console.log('tests', tests)
	return {
		tests
	}
}

export default connect(mapStateToProps)(TestQuestion);

