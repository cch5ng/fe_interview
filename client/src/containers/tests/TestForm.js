import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../questions/QuestionActions';

const questionCategories = [
	`Coding Questions`,
	`CSS Questions`,
	`Fun Questions`,
	`General Questions`,
	`HTML Questions`,
	`JavaScript Questions`,
	`Network Questions`,
	`Performance Questions`,
	`Testing Questions`
];

const initState = {
	inputTestName: '',
	inputQuestionCount: 0,
	selectTimePerQuestion: 'no limit',
	CodingQuestions: false,
	CSSQuestions: false,
	FunQuestions: false,
	GeneralQuestions: false,
	HTMLQuestions: false,
	JavaScriptQuestions: false,
	NetworkQuestions: false,
	PerformanceQuestions: false,
	TestingQuestions: false
}

class TestForm extends Component {

	constructor(props) {
		super(props);

		this.state = {
			inputTestName: '',
			inputQuestionCount: 0,
			selectTimePerQuestion: 'no limit',
			CodingQuestions: 0,
			CSSQuestions: 0,
			FunQuestions: 0,
			GeneralQuestions: 0,
			HTMLQuestions: 0,
			JavaScriptQuestions: 0,
			NetworkQuestions: 0,
			PerformanceQuestions: 0,
			TestingQuestions: 0
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.resetState = this.resetState.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.generateTest = this.generateTest.bind(this);
		this.getQuestionCountPerCategory = this.getQuestionCountPerCategory.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(fetchQuestions());
	}

	//event handlers

	// input change handler
	handleInputChange(ev) {
		const target = ev.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		console.log('ev.target.value', ev.target.value)
		this.setState({ [name]: value });
	}

	// form submit handler
	handleFormSubmit(ev) {
		ev.preventDefault();

		// do stuff, call action
		// (axn) save initial data to redux
		// do calculations to generate a pseudo random test
			// this.generateTest()
		// redirect to a new view (summary view to be able to start the test)

		this.resetState();
	}

	// reset state
	resetState(ev) {
		ev.preventDefault();
		this.setState(initState);
	}

	generateTest(numQuestions, categoriesAr, questions) {

	}

	getQuestionCountPerCategory(questions, categoriesAr) {
		let questionCountObj = {};
		// key is category; value is number of questions

		categoriesAr.forEach(category => {
			questionCountObj[category] = null;
		});

		questions.forEach(question => {
			let categ = question.category;
			if (questionCountObj[categ]) {
				questionCountObj[categ] += 1;
			} else {
				questionCountObj[categ] = 1;
			}
		});

		return questionCountObj;
	}

	render() {
		let questionObj = this.props.questions && this.props.questions.questions ? this.props.questions.questions : null;
		let questionsAr = [];
		console.log('questionObj', questionObj);
		let questionsMaxObj = {};

		if (questionObj) {
			questionsAr = Object.keys(questionObj).map(k => questionObj[k]);
			questionsMaxObj = this.getQuestionCountPerCategory(questionsAr, questionCategories);
			console.log('questionsMaxObj', questionsMaxObj);
		}

		return (
			<div>
				<form className="new-test-form">

					<div>
						<label>Name
							<input type="text" name="inputTestName"
								value={this.state.inputTestName}
								onChange={this.handleInputChange} 
							/>
						</label>
					</div>

					<div>
						<label>Time per Question (minutes)</label>
						<select id="select-time-per-question" name="selectTimePerQuestion"
							value={this.state.selectTimePerQuestion}
							onChange={this.handleInputChange} 							
						>
							<option value="no limit">no time limit</option>
							<option value="5">5</option>
							<option value="8">8</option>
							<option value="10">10</option>
							<option value="15">15</option>
						</select>
					</div>

					<div>
						<h2>Number of Questions (by Category)</h2>

						{questionCategories.map(category => {
							let categoryAr = category.split(' ');
							const categoryShort = categoryAr[0];
							const categoryConcat = categoryAr.join('');
							const maxQuestionCount = questionsMaxObj ? questionsMaxObj[category] : 0;

							return (
								<React.Fragment key={categoryConcat}>
									<label>{categoryShort} (Max: {maxQuestionCount})
										<input type="number" name={categoryConcat} 
											value={this.state[categoryConcat]}
											onChange={this.handleInputChange}
											max={maxQuestionCount}
											min="0"
										/>
									</label>
									<br />
								</React.Fragment>
							)
						})}

					</div>

					{/* 
						<input type="checkbox" name={categoryConcat} checked={this.state[categoryConcat]} 
							onChange={this.handleInputChange}
						/>
						<label>{categoryShort}</label>
					*/}

					{/* 
					<div>
						<label>Number of Questions
							<input type="number" name="inputQuestionCount" 
								value={this.state.inputQuestionCount}
								onChange={this.handleInputChange} 
							/>
						</label>
					</div>					
					*/}


					<button id="button-create-test" onClick={this.handleFormSubmit}>Create</button>
					
					{/* maybe more confusing than useful
					<button id="button-cancel-test" onClick={this.resetState} >Cancel</button>
					*/}

				</form>
			</div>
		)
	}
}

function mapStateToProps({ questions }) {
	console.log('questions', questions)
	return {
		questions
	}
}

export default connect(mapStateToProps)(TestForm);

