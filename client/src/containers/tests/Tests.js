import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTests } from './TestActions';
import { getPrettyTime, getPrettyDate } from '../../utils/helper';

class Tests extends Component {

	constructor(props) {
		super(props);

		this.getQuestionsMissedCount = this.getQuestionsMissedCount.bind(this);
		this.getAvgTimePerQuestion = this.getAvgTimePerQuestion.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(fetchTests());
	}

	getQuestionsMissedCount(questionsAr) {
		let missedCount = 0;
		
		questionsAr.forEach(question => {
			if (!question.question_completed) {
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

	render() {
		let { tests } = this.props;
		let testsAr = [];

		if (tests && tests.tests) {
			testsAr = Object.keys(tests.tests).map(testKey => {
				return this.props.tests.tests[testKey];
			})
		}

		return (
			<div>
				<h2>All Tests</h2>

				{testsAr.map(test => {
					const missedQuestions = test.questions ? this.getQuestionsMissedCount(test.questions) : null;
					const completedQuestionsCount = test.questions ? test.questions.length - missedQuestions : null;
					const testSummaryUrl = `/tests/${test.id}`;
					console.log('testSummaryUrl', testSummaryUrl);

					return (
						<div className="test" key={test.id} >
							<Link to={testSummaryUrl}>
								<ul>
									<li>Name {test.name}</li>
									<li>Date {getPrettyDate(test.date_taken)}</li>
									<li>{test.questions ? test.questions.length : null} questions</li>
									<li>{missedQuestions} questions missed</li>
									<li>Total Time {getPrettyTime(test.time_total)}</li>
									<li>Time per question {test.questions ? this.getAvgTimePerQuestion(test.time_total, completedQuestionsCount): null}</li>
								</ul>
							</Link>
						</div>
					)	
				})}
			</div>
		)
	}

}

function mapStateToProps({ tests }) {
	return {
		tests
	}
}

export default connect(mapStateToProps)(Tests);
