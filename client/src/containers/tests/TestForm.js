import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { fetchQuestions } from '../questions/QuestionActions';
import { fetchRandomTest } from '../tests/TestActions';

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
	formSubmitted: false,
	inputTestName: '',
	inputQuestionCount: 0,
	selectTimePerQuestion: 'no limit',
	"Coding Questions": 0,
	"CSS Questions": 0,
	"Fun Questions": 0,
	"General Questions": 0,
	"HTML Questions": 0,
	"JavaScript Questions": 0,
	"Network Questions": 0,
	"Performance Questions": 0,
	"Testing Questions": 0
}

class TestForm extends Component {

	constructor(props) {
		super(props);

		this.state = initState;

		this.handleInputChange = this.handleInputChange.bind(this);
		this.resetState = this.resetState.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		//this.generateTest = this.generateTest.bind(this);
		this.getQuestionCountPerCategory = this.getQuestionCountPerCategory.bind(this);
		this.getQuestionsObjFromAr = this.getQuestionsObjFromAr.bind(this);
		//this.getRandomArbitrary = this.getRandomArbitrary.bind(this);
		this.getTotalTestTime = this.getTotalTestTime.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(fetchQuestions());
	}

	//event handlers

	// input change handler
	handleInputChange(ev) {
		const target = ev.target;
		let value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		if (questionCategories.indexOf(name) > -1) {
			value = parseInt(value, 10);
		}

		this.setState({ [name]: value });
	}

	// form submit handler
	handleFormSubmit(ev) {
		ev.preventDefault();

		let testData = {};

		// build questionsData
		let questionCountsObj = this.getQuestionsObjFromAr(questionCategories);
		console.log('questionCountsObj', questionCountsObj);
		//let questionIds = this.generateTest(questionCountsObj, questionsAr);

		// do stuff, call action

		// build testData
		testData.name = this.state.inputTestName;
		testData.time_total = this.getTotalTestTime(); //TODO need to calculat this;
		testData.date_taken = null;

		// (axn) save initial data to redux
		this.props.dispatch(fetchRandomTest(questionCountsObj, testData));

		// redirect to a new view (summary view to be able to start the test)

		this.resetState();
	}

	// reset state
	resetState() {
		//ev.preventDefault();
		this.setState({ ...initState, formSubmitted: true });
	}

	// questionCountsObj {"category": num questions to get}
	// generateTest(questionCountsObj, questions) {
	// 	// return a list of question id's (in random order)
	// 	let questionIds = [];
	// 	this.props.dispatch()

	// 	//TODO 013019, verify that the category format is long string, not concat string
	// 	// then can make the action call
	// 	// probably want to concat all questions into flat list
	// 	// probably want to randomize the order of questions (so it is not sorted by category)

	// 	console.log('questionIds', questionIds);
	// 	return questionIds;
	// }

	// used to get the max potential questions requested by category
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

	// used to get the current user requested questions count by category
	getQuestionsObjFromAr(categoriesAr) {
		let questObj = {};

		categoriesAr.forEach(category => {
			//let categoryConcat = category.split(' ').join('');
			questObj[category] = this.state[category];
			//questObj[categoryConcat] = this.state[categoryConcat];
		});

		console.log('questObj', questObj);
		return questObj;
	}

	// helper
	getTotalTestTime() {
		let totalQuestions = 0;

		questionCategories.forEach(category => {
			totalQuestions += this.state[category];
		});

		return totalQuestions * this.state.selectTimePerQuestion;
	}

	render() {
		let questionObj = this.props.questions && this.props.questions.questions ? this.props.questions.questions : null;
		let questionsAr = [];
		let questionsMaxObj = {};

		if (questionObj) {
			questionsAr = Object.keys(questionObj).map(k => questionObj[k]);
			questionsMaxObj = this.getQuestionCountPerCategory(questionsAr, questionCategories);
		}

		return (
			<div>

				{this.state.formSubmitted && (
					<Redirect to="/tests/current" />
				)}

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
							<option value="300000">5</option>
							<option value="480000">8</option>
							<option value="600000">10</option>
							<option value="900000">15</option>
						</select>
					</div>

					<div>
						<h2>Number of Questions (by Category)</h2>

						{questionCategories.map(category => {
							let categoryAr = category.split(' ');
							const categoryShort = categoryAr[0];
							const maxQuestionCount = questionsMaxObj ? questionsMaxObj[category] : 0;

							return (
								<React.Fragment key={category}>
									<label>{categoryShort} (Max: {maxQuestionCount})
										<input type="number" name={category} 
											value={this.state[category]}
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

