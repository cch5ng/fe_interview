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

	}

	getPrettyTime(timeMs) {

	}

	getPrettyDate(date) {

	}

	getAvgTimePerQuestion(totalTime, missedQuestCount) {

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

				{testsAr.map(test => (
					<div className="test" key={test.id} >
						<ul>
							<li>Name {test.name}</li>
							<li>Date {test.date_taken}</li>
							<li>{test.questions ? test.questions.length : null} questions</li>
							<li>ZZ questions missed</li>
							<li>Total Time {test.time_total}</li>
							<li>Time per question ZZ</li>
						</ul>
					</div>
				))}
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
