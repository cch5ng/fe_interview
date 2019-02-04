import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUpdateTest } from './TestActions';

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
		this.handleInputUpdate = this.handleInputUpdate.bind(this);
	}

	componentDidMount() {
		//this.props.dispatch(fetchQuestions());
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
		let questionData = { test_id, question_id, response };

		//update redux (question id and response)
		this.props.dispatch(fetchUpdateTest(questionData));
	
		this.props.history.push('/tests/current');
	}

	render() {
		//TODO question detail could also have 2 states (if parent test is active vs completed)
		let curQuestionId;
		
		if (this.props.match) {
			//console.log('id', this.props.match.params.id);
			curQuestionId = this.props.match.params.id;
		}

		let curTestObj = this.props.tests && this.props.tests.curTest ? this.props.tests.curTest : null;
		let curTestStatus = curTestObj && curTestObj.status ? curTestObj.status : 'initialized';
		let curQuestion = curTestObj && curQuestionId && curTestObj.questions ? curTestObj.questions[curQuestionId] : null;
		let curQuestionStatus = curQuestion && curQuestion.status ? curQuestion.status : 'not visited';
		let curQuestionResponse = curQuestion && curQuestion.response ? curQuestion.response : '';
		let curQuestionContent = curQuestion && curQuestion.content ? curQuestion.content : '';

		console.log('curQuestion', curQuestion);
		console.log('curQuestionContent', curQuestionContent);

		return (
			<div>
				<h1>Test Question</h1>

				{curTestStatus === 'active' && (
					<div>
						<div>Time Left: </div>

						<h2>Question {curQuestionContent}</h2>

						<textarea
							name="curQuestionResponse"
							value={this.state.curQuestionResponse}
							onChange={this.handleInputUpdate}
						></textarea>

						<button onClick={this.submitQuestion} >Submit</button>

					</div>
				)}

				{curTestStatus === 'completed' && (
					<div>

						<h2>Question {curTestObj.name}</h2>

						<textarea
							name="curQuestionResponse"
							value={this.state.curQuestionResponse}
							readOnly="true"
						></textarea>

						<Link to="/tests/current" >Back</Link>
					</div>
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

export default withRouter(connect(mapStateToProps)(TestQuestion));
