import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { startTest, fetchUpdateTest } from './TestActions';
import { dictToRandomAr, getPrettyTime } from '../../../utils/helper';

class TestSummary extends Component {

	constructor(props) {
		super(props);

		this.state = {
			displayTestQuestion: false
		};

		this.startTest = this.startTest.bind(this);
		this.submitTest = this.submitTest.bind(this);
		this.getQuestionsCountByStatus = this.getQuestionsCountByStatus.bind(this);
	}

	componentDidMount() {
		//this.props.dispatch(fetchQuestions());
	}

	//event handlers
	startTest(ev) {
		ev.preventDefault();

		let curTest = this.props.tests && this.props.tests.curTest ? this.props.tests.curTest : null ;
		let curTestTimeTotal = curTest && curTest.time_total ? curTest.time_total : 0;
		let randomQuestAr = this.props.tests && this.props.tests.curTest && this.props.tests.curTest.questions ? dictToRandomAr(this.props.tests.curTest.questions) : [];
		let firstQuestionUrl = randomQuestAr.length ? `/tests/question/${randomQuestAr[0].id}` : null;

		this.props.dispatch(startTest());
		this.props.startCountdownTimer(curTestTimeTotal);

		if (firstQuestionUrl) {
			this.props.history.push(firstQuestionUrl);
		}

		// state: remaining_time; current_question - default to sort_order 0
		// update status in redux
		// start countdown timer (probably need to review also cleaning up the timer when the test is done)
		// toggle state displayTestQuestion to true (this should redirect to first question in test)
		// automatically open the first question in the list

	}

	submitTest(ev) {
		ev.preventDefault();

		const test_id = this.props.tests && this.props.tests.curTest ? this.props.tests.curTest.id : null;
		// stop timer (delete timer instance)
		this.props.stopCountdownTimer({test_id, status: 'completed'});
		// make sure all changes are saved - redux and BE

	}

	getQuestionsCountByStatus() {
		let questionsCountObj = {};
		let randomQuestAr = this.props.tests && this.props.tests.curTest && this.props.tests.curTest.questions ? dictToRandomAr(this.props.tests.curTest.questions) : [];
	
		randomQuestAr.forEach(question => {
			if (question.status !== 'completed') {
				if (questionsCountObj.skipped) {
					questionsCountObj.skipped += 1;
				} else {
					questionsCountObj.skipped = 1;
				}
			} else if (question.status === 'completed') {
				if (questionsCountObj.completed) {
					questionsCountObj.completed += 1;
				} else {
					questionsCountObj.completed = 1;
				}
			}
		})

		return questionsCountObj;
	}

	render() {
		let curTestObj = this.props.tests && this.props.tests.curTest ? this.props.tests.curTest : null;
		let status = curTestObj && curTestObj.status ? curTestObj.status : 'initialized';
		let randomQuestAr = this.props.tests && this.props.tests.curTest && this.props.tests.curTest.questions ? dictToRandomAr(this.props.tests.curTest.questions) : [];
		let firstQuestionUrl = randomQuestAr.length ? `/tests/question/${randomQuestAr[0].id}` : null;
		let prettyTotalTime = curTestObj ? getPrettyTime(curTestObj.time_total) : '';
		let timeRemaining = curTestObj && curTestObj.time_remaining ? curTestObj.time_remaining : null;
		let timeTaken = curTestObj ? curTestObj.time_total - timeRemaining : null;

/*
	TODO
	time taken: time_total - time_remaining => prettified
	skipped questions: where status === 'skipped' or 'not_visited'
*/

		return (
			<div>

				<h1>Test Summary</h1>

				{status === 'active' && (
					<h1>Remaining Time {getPrettyTime(this.props.remainingTime)} </h1> 
				)}

				{curTestObj && (status === 'initialized' || status === 'active') && (
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

				{curTestObj && status === 'completed' && (
					<div>
						<h2>Name {curTestObj.name}</h2>
						<p>Time taken {getPrettyTime(timeTaken)} (Total time {prettyTotalTime})</p>
						<p>Skipped Questions {this.getQuestionsCountByStatus().skipped}</p>
						<p>Completed Questions {this.getQuestionsCountByStatus().completed}</p>
						<p>Total Questions {curTestObj.questions.length}</p>
					</div>
				)}

				{status === 'completed' && curTestObj && randomQuestAr && randomQuestAr.map(question => {
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
