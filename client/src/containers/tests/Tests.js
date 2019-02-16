import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { fetchTests } from './TestActions';
import { getPrettyTime, getPrettyDate } from '../../utils/helper';
import globalStyles from '../App.css';
import testStyles from './Tests.css';

let styles = {};
Object.assign(styles, globalStyles, testStyles);

class Tests extends Component {

	constructor(props) {
		super(props);

		this.getQuestionsMissedCount = this.getQuestionsMissedCount.bind(this);
		this.getAvgTimePerQuestion = this.getAvgTimePerQuestion.bind(this);
		this.prettyMissedQuestionsStr = this.prettyMissedQuestionsStr.bind(this);
	}

	componentDidMount() {
		let email = this.props.auth && this.props.auth.email ? this.props.auth.email : null;
		if (email) {
			this.props.dispatch(fetchTests({ email }));
		}
	}

	getQuestionsMissedCount(questionsAr) {
		let missedCount = 0;
		
		questionsAr.forEach(question => {
			if (question.status !== 'completed') {
				missedCount += 1;
			}
		});

		return missedCount;
	}

	getAvgTimePerQuestion(totalTime, completedQuestCount) {
		if (completedQuestCount === 0) {
			return 0;
		}

		let avgTime = totalTime / completedQuestCount;

		return getPrettyTime(avgTime);
	}

	prettyMissedQuestionsStr(missedQuestionsCnt) {
		if (missedQuestionsCnt === 0) {
			return 'all questions completed 😆🍕';
		}
		if (missedQuestionsCnt === 1) {
			return '1 question not completed';
		}
		return `${missedQuestionsCnt} questions not completed 😬`;
	}

	render() {
		let { tests } = this.props;
		let testsAr = [];

		if (tests && tests.tests) {
			testsAr = Object.keys(tests.tests).map(testKey => {
				return this.props.tests.tests[testKey];
			})
		}

		if (this.props.auth && !this.props.auth.email) {
			return (<Redirect to="/login" />)
		}

		return (
			<div>
				<h1>All Tests</h1>

				{testsAr.map(test => {
					const missedQuestions = test.questions ? this.getQuestionsMissedCount(test.questions) : null;
					const completedQuestionsCount = test.questions ? test.questions.length - missedQuestions : null;
					const testSummaryUrl = `/tests/${test.id}`;

					return (
						<div className={styles.test} key={test.id} >
							<Link to={testSummaryUrl}>
								<ul>
									<li className={[styles.testsListDetail, styles.testName].join(' ')}>{test.name}</li>
									<li className={styles.testsListDetail}>Created on {getPrettyDate(test.date_taken)}</li>
									<li className={styles.testsListDetail}>{test.questions ? test.questions.length : null} questions</li>
									<li className={styles.testsListDetail}>{this.prettyMissedQuestionsStr(missedQuestions)}</li>
									<li className={styles.testsListDetail}>Completed in {getPrettyTime(test.time_total - test.time_remaining)} / {getPrettyTime(test.time_total)}</li>
								</ul>
							</Link>
						</div>
					)	
				})}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		tests: state.tests,
		auth: state.auth,
	}
}

export default connect(mapStateToProps)(Tests);
