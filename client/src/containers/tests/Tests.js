import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTests } from './TestActions';

class Tests extends Component {

	constructor(props) {
		super(props);

		this.getQuestionsMissedCount = this.getQuestionsMissedCount.bind(this);
		this.getPrettyTime = this.getPrettyTime.bind(this);
		this.getPrettyDate = this.getPrettyDate.bind(this);
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

	getPrettyTime(timeMs) {
		let hour;
		let minute = Math.floor(timeMs / 60000);
		let second = Math.floor(timeMs / 1000);
		let prettyTimeStr = `${minute} minutes, ${second} seconds`;


		console.log('prettyTimeStr', prettyTimeStr);
		return prettyTimeStr;
	}

	getPrettyDate(date) {

	}

	getAvgTimePerQuestion(totalTime, completedQuestCount) {

		if (completedQuestCount === 0) {
			return 0;
		}

		let avgTime = totalTime / completedQuestCount;

		return this.getPrettyTime(avgTime);
	}

	render() {
		console.log('tests', this.props.tests);
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


					return (
						<div className="test" key={test.id} >
							<ul>
								<li>Name {test.name}</li>
								<li>Date {test.date_taken}</li>
								<li>{test.questions ? test.questions.length : null} questions</li>
								<li>{missedQuestions} questions missed</li>
								<li>Total Time {test.time_total}</li>
								<li>Time per question {test.questions ? this.getAvgTimePerQuestion(test.time_total, completedQuestionsCount): null}</li>
							</ul>
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
