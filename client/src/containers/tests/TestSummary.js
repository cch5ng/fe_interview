import React, { Component } from 'react';
import { connect } from 'react-redux';

const initState = {
}

class TestSummary extends Component {

	constructor(props) {
		super(props);

		this.state = initState;

		//this.getRandomArbitrary = this.getRandomArbitrary.bind(this);
	}

	componentDidMount() {
		//this.props.dispatch(fetchQuestions());
	}

	//event handlers

	render() {
		let curTestObj = this.props.tests && this.props.tests.curTest ? this.props.tests.curTest : null;
		// let questionsAr = [];
		// let questionsMaxObj = {};

		// if (questionObj) {
		// 	questionsAr = Object.keys(questionObj).map(k => questionObj[k]);
		// 	questionsMaxObj = this.getQuestionCountPerCategory(questionsAr, questionCategories);
		// }

		return (
			<div>
				<h1>Test Summary</h1>

				{curTestObj && (
					<div>
						<ul>
							<li>Name {curTestObj.name}</li>
							<li>Num Questions {curTestObj.questions.length}</li>
						</ul>
					</div>
				)}
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

export default connect(mapStateToProps)(TestSummary);

