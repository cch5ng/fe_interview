import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { fetchQuestions } from '../questions/QuestionActions';
import { fetchRandomTest } from '../tests/TestActions';
import appStyles from '../App.css';
import testFormStyles from './TestForm.css';

let styles = {};
Object.assign(styles, appStyles, testFormStyles);
let cx = classNames.bind(styles);

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
	selectTimePerQuestion: 0,
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
		let email = this.props.auth && this.props.auth.email ? this.props.auth.email : null;

		// build questionsData
		let questionCountsObj = this.getQuestionsObjFromAr(questionCategories);

		// build testData
		testData.name = this.state.inputTestName;
		testData.time_total = this.getTotalTestTime(); //TODO need to calculat this;
		testData.date_taken = null;
		testData.email = email;

		// (axn) save initial data to redux
		this.props.dispatch(fetchRandomTest(questionCountsObj, testData));

		// redirect to a new view (summary view to be able to start the test)

		this.resetState();
	}

	// reset state
	resetState() {
		this.setState({ ...initState, formSubmitted: true });
	}

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
			questObj[category] = this.state[category];
		});

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
		let newTestUrl = `/tests/current`;

		if (questionObj) {
			questionsAr = Object.keys(questionObj).map(k => questionObj[k]);
			questionsMaxObj = this.getQuestionCountPerCategory(questionsAr, questionCategories);
		}

		return (
			<div className={styles.testFormContainer}>

				{this.state.formSubmitted && (
					<Redirect to={newTestUrl} />
				)}

				<form className="new-test-form">
					<div className={styles.formGroup}>
						<label>
							Name
						</label>
						<input type="text" name="inputTestName"
							value={this.state.inputTestName}
							onChange={this.handleInputChange} 
						/>
					</div>

					<div className={styles.formGroup}>
						<label>
							Time per Question
						</label>
						<select id="select-time-per-question" name="selectTimePerQuestion"
							value={this.state.selectTimePerQuestion}
							onChange={this.handleInputChange} 							
						>
							<option value="0">no time limit</option>
							<option value="300000">5</option>
							<option value="480000">8</option>
							<option value="600000">10</option>
							<option value="900000">15</option>
						</select>
						(minutes)
					</div>

					<div>
						<h2>Number of Questions (by Category)</h2>
						<div className={styles.testFormCategoriesContainer}>
							{questionCategories.map(category => {
								let categoryAr = category.split(' ');
								const categoryShort = categoryAr[0];
								const maxQuestionCount = questionsMaxObj ? questionsMaxObj[category] : 0;
								let formGroupClass = cx({
						      [styles.formGroup]: true,
						      [styles.categoryFormGroup]: true
						    });

								return (
									<div key={category} className={formGroupClass}>
										<label className={styles.labelCategory}>
											{categoryShort} (Max: {maxQuestionCount})
										</label>
										<input type="number" name={category} 
											value={this.state[category]}
											onChange={this.handleInputChange}
											max={maxQuestionCount}
											min="0"
											placeholder={maxQuestionCount}
										/>
									</div>
								)
							})}
						</div>
					</div>

					<button id="button-create-test" onClick={this.handleFormSubmit}>Create</button>
					
				</form>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		questions: state.questions,
		tests: state.tests,
		auth: state.auth,
	}
}

export default connect(mapStateToProps)(TestForm);

