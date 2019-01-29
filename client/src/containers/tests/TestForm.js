import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { fetchTests } from './TestActions';

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

		this.handleInputChange = this.handleInputChange.bind(this);
		this.resetState = this.resetState.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.generateTest = this.generateTest.bind(this);
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
		// save initial data to redux
		// do calculations to generate a pseudo random test
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

	render() {
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
						<label>Number of Questions
							<input type="number" name="inputQuestionCount" 
								value={this.state.inputQuestionCount}
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
						<h2>Question Categories</h2>

						{questionCategories.map(category => {
							let categoryAr = category.split(' ');
							const categoryShort = categoryAr[0];
							const categoryConcat = categoryAr.join('');

							return (
								<React.Fragment key={categoryConcat}>
									<input type="checkbox" name={categoryConcat} checked={this.state[categoryConcat]} 
										onChange={this.handleInputChange}
									/>
									<label>{categoryShort}</label>
								</React.Fragment>
							)
						})}

					</div>

					<button id="button-create-test" onClick={handleFormSubmit}>Create</button>
					
					{/* maybe more confusing than useful
					<button id="button-cancel-test" onClick={this.resetState} >Cancel</button>
					*/}

				</form>
			</div>
		)
	}
}

export default TestForm;

