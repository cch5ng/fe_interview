import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link, withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { startTest, fetchUpdateTest, fetchTestById } from './TestActions';
import { dictToRandomAr, getPrettyTime } from '../../utils/helper';
import globalStyles from '../App.css';
import testStyles from './Tests.css';

let styles = {};
Object.assign(styles, globalStyles, testStyles);
let cx = classNames.bind(styles);

class TestSummary extends Component {

	constructor(props) {
		super(props);

		this.state = {
			displayTestQuestion: false
		};

		this.startTest = this.startTest.bind(this);
		this.submitTest = this.submitTest.bind(this);
		this.getQuestionsCountByStatus = this.getQuestionsCountByStatus.bind(this);
		this.getQuestionStatusIconClass = this.getQuestionStatusIconClass.bind(this);
		this.getQuestionIdFromHistory = this.getQuestionIdFromHistory.bind(this);
	}

	componentDidMount() {
		let test_id;

		if (this.props.match.params && this.props.match.params.test_id) {
			test_id = this.props.match.params.test_id;
		} else {
			test_id = this.getQuestionIdFromHistory();
		}
		console.log('test_id', test_id)

		this.props.dispatch(fetchTestById({ id: test_id }));
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
		let questionsCountObj = {
			skipped: 0,
			completed: 0
		};
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

	convertStatusToIcon(status) {
		switch(status) {
			case 'completed':
				return {__html: '&#10003;'};
			case 'skipped':
				return {__html: '&#10007;'};
			default:
				return {__html: '&#10079;'}; 
		}
	}

	getQuestionStatusIconClass(status) {
		switch(status) {
			case 'completed':
			case 'not_visited':
				return [styles.questionStatusIconClass, styles.green].join(' ');
			case 'skipped':
				return [styles.questionStatusIconClass, styles.red].join(' ');
			default:
				return [styles.questionStatusIconClass, styles.green].join(' ');
		}		
	}

		// added for test purpose; need to refactor
	getQuestionIdFromHistory() {
		let questionId;

		if (this.props.history && this.props.history.location && this.props.history.location.pathname) {
			let pathAr = this.props.history.location.pathname.split('/')
			questionId = pathAr[pathAr.length - 1];
		}

		return questionId;
	}

	render() {
		let curTestObj = this.props.tests && this.props.tests.curTest ? this.props.tests.curTest : null;
		let status = curTestObj && curTestObj.status ? curTestObj.status : 'initialized';
		let randomQuestAr = this.props.tests && this.props.tests.curTest && this.props.tests.curTest.questions ? dictToRandomAr(this.props.tests.curTest.questions) : [];
		let firstQuestionUrl = randomQuestAr.length ? `/tests/question/${randomQuestAr[0].id}` : null;
		let prettyTotalTime = curTestObj ? getPrettyTime(curTestObj.time_total) : '';
		// TODO is timeRemaining used?
		let timeRemaining = curTestObj && curTestObj.time_remaining ? curTestObj.time_remaining : null;

		let timeTaken = curTestObj ? curTestObj.time_total - timeRemaining : null;
		let curTestQuestionsCount = curTestObj && curTestObj.questions ? Object.keys(curTestObj.questions).length : 0;

    let displayAlarm = this.props.remainingTime <= 300000 ? true : false;

/*
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
*/

		return (
			<div>
				{(status === 'initialized' || status === 'completed') && (
					<h1>Test Summary</h1>
				)}

				{status === 'active' && (
					<div className={styles.testSummaryHeading}>
						<h1>Test Summary</h1>
						<div className={displayAlarm ? [styles.countdownDisplay, styles.countdownAlarm].join(' ') : styles.countdownDisplay}>
							<p>{getPrettyTime(this.props.remainingTime)}</p>
							<p>remaining</p>
						</div> 
					</div>
				)}

				{curTestObj && (status === 'initialized' || status === 'active') && (
					<div data-testid="test_summary">
						<h2>Name {curTestObj.name}</h2>
						<p>Total time {prettyTotalTime}</p>
						<p>Total Questions {curTestQuestionsCount}</p>
					</div>
				)}

				{status === 'initialized' && curTestObj && randomQuestAr && randomQuestAr.map(question => {
					const displayOrder = question.sort_order + 1;
					let curQuestionUrl = `/tests/question/${question.id}`;
					let questionStatusIconClass;

					return (
						<div key={displayOrder} className={styles.question}>
							Q{displayOrder} 
							<span dangerouslySetInnerHTML={this.convertStatusToIcon(question.status)}
								className={this.getQuestionStatusIconClass(question.status)} />
						</div>
					)
				})}

				{curTestObj && status === 'completed' && (
					<div className={styles.testSummary} data-testid="test_summary">
						<h2><span className={styles.bold}>Name</span> {curTestObj.name}</h2>
						<p><span className={styles.bold}>Time used</span> {getPrettyTime(timeTaken)} / {prettyTotalTime}</p>
						<p><span className={styles.bold}>Skipped Questions</span> {this.getQuestionsCountByStatus().skipped} / {curTestQuestionsCount}</p>
						<p><span className={styles.bold}>Completed Questions</span> {this.getQuestionsCountByStatus().completed} / {curTestQuestionsCount}</p>
					</div>
				)}

				{(status === 'active' || status === 'completed') && curTestObj && randomQuestAr && randomQuestAr.map(question => {
					const displayOrder = question.sort_order + 1;
					let curQuestionUrl = `/tests/question/${question.id}`;
					let statusIcon = '';

					return (
						<div key={displayOrder}
							className={styles.question}>Q{displayOrder}
								<span dangerouslySetInnerHTML={this.convertStatusToIcon(question.status)} 
									className={this.getQuestionStatusIconClass(question.status)} />
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

				{status === 'completed' && (
					<div className={[styles.linkButton, styles.btnTestSummaryBack].join(' ')}>
						<NavLink to="/tests" >Back</NavLink>
					</div>
				)}

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		tests: state.tests,
	}
}

export default withRouter(connect(mapStateToProps)(TestSummary));
