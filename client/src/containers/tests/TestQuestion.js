import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link, withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUpdateTestQuestion } from './TestActions';
import { getPrettyTime } from '../../utils/helper';
import globalStyles from '../App.css';
import testStyles from './Tests.css';

let styles = {};
Object.assign(styles, globalStyles, testStyles);

class TestQuestion extends Component {

	constructor(props) {
		super(props);

		let	curQuestionId = this.props.match.params.id;
		let curTestObj = this.props.tests && this.props.tests.curTest ? this.props.tests.curTest : null;
		let curQuestion = curTestObj && curQuestionId && curTestObj.questions ? curTestObj.questions[curQuestionId] : null;		

		this.state = {
			curQuestionResponse: curQuestion && curQuestion.response ? curQuestion.response : ''
		};

		this.submitQuestion = this.submitQuestion.bind(this);
		this.skipQuestion = this.skipQuestion.bind(this);
		this.handleInputUpdate = this.handleInputUpdate.bind(this);
	}

	//event handlers
	handleInputUpdate(ev) {
		let response = ev.target.value;
		let name = ev.target.name;
		this.setState({[name]: response})

	}

	submitQuestion(ev) {
		ev.preventDefault();
		let test_id = this.props.tests && this.props.tests.curTest && this.props.tests.curTest.id ? this.props.tests.curTest.id : null;
		let question_id = this.props.match.params.id;
		question_id = parseInt(question_id, 10);
		let response = this.state.curQuestionResponse;
		let question_status = 'completed';
		let questionData = { test_id, question_id, response, question_status };

		//update redux (question id and response)
		this.props.dispatch(fetchUpdateTestQuestion(questionData));
	
		this.props.history.push('/tests/current');
	}

	skipQuestion(ev) {
		ev.preventDefault();

		let test_id = this.props.tests && this.props.tests.curTest && this.props.tests.curTest.id ? this.props.tests.curTest.id : null;
		let question_id = this.props.match.params.id;
		question_id = parseInt(question_id, 10);
		let response = '';
		let question_status = 'skipped';
		let questionData = { test_id, question_id, response, question_status };

		//update redux (question id and response)
		this.props.dispatch(fetchUpdateTestQuestion(questionData));
		this.props.history.push('/tests/current');
	}

	render() {
		let curQuestionId;
		
		if (this.props.match) {
			curQuestionId = this.props.match.params.id;
		}

		let curTestObj = this.props.tests && this.props.tests.curTest ? this.props.tests.curTest : null;
		let curTestStatus = curTestObj && curTestObj.status ? curTestObj.status : 'initialized';
		let curQuestion = curTestObj && curQuestionId && curTestObj.questions ? curTestObj.questions[curQuestionId] : null;
		let curQuestionStatus = curQuestion && curQuestion.status ? curQuestion.status : 'not visited';
		let curQuestionResponse = curQuestion && curQuestion.response ? curQuestion.response : '';
		let curQuestionContent = curQuestion && curQuestion.content ? curQuestion.content : '';
    let displayAlarm = this.props.remainingTime <= 300000 ? true : false;

		return (
			<div>
				{(curTestStatus === 'initialized' || curTestStatus === 'completed') && (
					<h1>Question {curTestObj.questions[curQuestionId].sort_order + 1}</h1>
				)}

				{curTestStatus === 'active' && (
					<React.Fragment>
						<div className={styles.testSummaryHeading}>
							<h1>Question {curTestObj.questions[curQuestionId].sort_order + 1}</h1>
							<div className={displayAlarm ? [styles.countdownDisplay, styles.countdownAlarm].join(' ') : styles.countdownDisplay}>
								<p>{getPrettyTime(this.props.remainingTime)}</p>
								<p>remaining</p>
							</div> 
						</div>
					
						<div>
							<h2>{curQuestionContent}</h2>

							<textarea
								name="curQuestionResponse"
								value={this.state.curQuestionResponse}
								onChange={this.handleInputUpdate}
							></textarea>

							<div className={styles.btnQuestionSection}>
								<button onClick={this.submitQuestion} className={styles.btnQuestion}>Submit</button>
								<button onClick={this.skipQuestion} className={styles.btnQuestion}>Skip</button>
							</div>
						</div>
					</React.Fragment>
				)}

				{curTestStatus === 'completed' && (
					<div>
						<h2>{curQuestionContent}</h2>
						<textarea
							name="curQuestionResponse"
							value={this.state.curQuestionResponse}
							disabled
						></textarea>

						<div>
							<span className={styles.linkButton}><NavLink to="/tests/current" >Back</NavLink></span>
						</div>
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

export default withRouter(connect(mapStateToProps)(TestQuestion));
