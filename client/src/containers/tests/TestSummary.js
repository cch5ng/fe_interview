import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { startTest } from './TestActions';
import { dictToRandomAr, getPrettyTime } from '../../../utils/helper';

class TestSummary extends Component {

	constructor(props) {
		super(props);

		this.state = {
			displayTestQuestion: false
		};

		this.startTest = this.startTest.bind(this);
	}

	componentDidMount() {
		//this.props.dispatch(fetchQuestions());
	}

	//event handlers
	startTest(ev) {
		ev.preventDefault();

		let randomQuestAr = this.props.tests && this.props.tests.curTest && this.props.tests.curTest.questions ? dictToRandomAr(this.props.tests.curTest.questions) : [];
		let firstQuestionUrl = randomQuestAr.length ? `/tests/question/${randomQuestAr[0].id}` : null;

		this.props.dispatch(startTest());

		if (firstQuestionUrl) {
			this.props.history.push(firstQuestionUrl);
		}

		// state: remaining_time; current_question - default to sort_order 0
		// update status in redux
		// start countdown timer (probably need to review also cleaning up the timer when the test is done)
		// toggle state displayTestQuestion to true (this should redirect to first question in test)
		// automatically open the first question in the list

	}

	submitTest() {

	}

	render() {
		let curTestObj = this.props.tests && this.props.tests.curTest ? this.props.tests.curTest : null;
		let status = curTestObj && curTestObj.status ? curTestObj.status : 'initialized'; // 'active', 'completed'
		let randomQuestAr = this.props.tests && this.props.tests.curTest && this.props.tests.curTest.questions ? dictToRandomAr(this.props.tests.curTest.questions) : [];
		let firstQuestionUrl = randomQuestAr.length ? `/tests/question/${randomQuestAr[0].id}` : null;
		console.log('firstQuestionUrl', firstQuestionUrl);
		let prettyTotalTime = curTestObj ? getPrettyTime(curTestObj.time_total) : '';

		// let questionsAr = [];
		// let questionsMaxObj = {};

		// if (questionObj) {
		// 	questionsAr = Object.keys(questionObj).map(k => questionObj[k]);
		// 	questionsMaxObj = this.getQuestionCountPerCategory(questionsAr, questionCategories);
		// }

/*
				{TODO debug this because after user submits a question, cannot return to test summary as result of condition }
				{curTestObj && status === 'active' && (
					<Redirect to={firstQuestionUrl} />
				)}
*/

		return (
			<div>

				<h1>Test Summary</h1>

				{curTestObj && (
					<div>
						<h2>Name {curTestObj.name}</h2>
						<p>Total time {prettyTotalTime}</p>
						<p>Total Questions {curTestObj.questions.length}</p>
					</div>
				)}

				{status === 'initialized' && curTestObj && randomQuestAr && randomQuestAr.map(question => {
					const displayOrder = question.sort_order + 1;
					let curQuestionUrl = `/tests/question/${question.id}`;
					return (
						<React.Fragment key={displayOrder}>
							<div className="question_num">{displayOrder} (id {question.id})</div>
							<div className="question_status">{question.status}</div>
						</React.Fragment>
					)
				})}


				{status === 'active' && curTestObj && randomQuestAr && randomQuestAr.map(question => {
					const displayOrder = question.sort_order + 1;
					let curQuestionUrl = `/tests/question/${question.id}`;
					return (
						<React.Fragment key={displayOrder}>
								<div className="question_num">{displayOrder} (id {question.id})</div>
								<div className="question_status">{question.status}</div>
								<Link to={curQuestionUrl}>
									<div className="link">Go</div>
								</Link>
						</React.Fragment>
					)
				})}


				{status === 'initialized' && (
					<button onClick={this.startTest} >Start</button>
				)}

				{status === 'active' && (
					<button onClick={this.submitTest} >Submit</button>
				)}

			</div>
		)
	}
}

function mapStateToProps({ tests }) {
	return {
		tests
	}
}

export default withRouter(connect(mapStateToProps)(TestSummary));
