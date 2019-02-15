import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link, withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startTest, fetchUpdateTest, fetchTestById } from './TestActions';
import { dictToRandomAr, getPrettyTime } from '../../utils/helper';
import globalStyles from '../App.css';
import testStyles from './Tests.css';

let styles = {};
Object.assign(styles, globalStyles, testStyles);

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
		if (this.props.match.params && this.props.match.params.test_id) {
			this.props.dispatch(fetchTestById({ id: this.props.match.params.test_id }));
		}
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
		let curTestQuestionsCount = curTestObj && curTestObj.questions ? Object.keys(curTestObj.questions).length : 0;

/*
	TODO
	time taken: time_total - time_remaining => prettified
	skipped questions: where status === 'skipped' or 'not_visited'
*/

/*
						<React.Fragment key={displayOrder}>
								<div className="question_num">{displayOrder} (id {question.id})</div>
								<div className="question_status">{question.status}</div>
								<Link to={curQuestionUrl}>
									<div className="link">Go</div>
								</Link>
						</React.Fragment>
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
						<p>Total Questions {curTestQuestionsCount}</p>
					</div>
				)}

				{status === 'initialized' && curTestObj && randomQuestAr && randomQuestAr.map(question => {
					const displayOrder = question.sort_order + 1;
					let curQuestionUrl = `/tests/question/${question.id}`;
					return (
						<div key={displayOrder} className={styles.question}>
							Q{displayOrder} {question.status} 
						</div>
					)
				})}

				{status === 'active' && curTestObj && randomQuestAr && randomQuestAr.map(question => {
					const displayOrder = question.sort_order + 1;
					let curQuestionUrl = `/tests/question/${question.id}`;
					return (
						<div key={displayOrder}
							className={styles.question}>Q{displayOrder} {question.status} 
								<span className={styles.linkButton}><NavLink to={curQuestionUrl}>Go</NavLink></span>
						</div>								
					)
				})}

				{curTestObj && status === 'completed' && (
					<div className={styles.testSummary}>
						<h2><span className={styles.bold}>Name</span> {curTestObj.name}</h2>
						<p><span className={styles.bold}>Time used</span> {getPrettyTime(timeTaken)} / {prettyTotalTime}</p>
						<p><span className={styles.bold}>Skipped Questions</span> {this.getQuestionsCountByStatus().skipped} / {curTestQuestionsCount}</p>
						<p><span className={styles.bold}>Completed Questions</span> {this.getQuestionsCountByStatus().completed} / {curTestQuestionsCount}</p>
					</div>
				)}

				{status === 'completed' && curTestObj && randomQuestAr && randomQuestAr.map(question => {
					const displayOrder = question.sort_order + 1;
					let curQuestionUrl = `/tests/question/${question.id}`;
					return (
						<div key={displayOrder}
							className={styles.question}>Q{displayOrder} {question.status} 
								<span className={styles.linkButton}><NavLink to={curQuestionUrl}>Go</NavLink></span>
						</div>								
					)
				})}



				{status === 'initialized' && (
					<button onClick={this.startTest} className={styles.btnTestSummary}>Start</button>
				)}

				{status === 'active' && (
					<button onClick={this.submitTest} className={styles.btnTestSummary}>Submit</button>
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
