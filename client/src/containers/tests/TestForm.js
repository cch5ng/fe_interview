import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { fetchTests } from './TestActions';

class TestForm extends Component {

	constructor(props) {
		super(props);

		this.state = {
			inputTestName: '',
			inputQuestionCount: 0,


		}

		this.inputChangeHandler = this.inputChangeHandler.bind(this);
	}

	//event handlers

	// input change handler
	inputChangeHandler(ev) {
		console.log('ev.target.value', ev.target.value)
		let obj = {};
		obj[ev.target.name] = ev.target.value;
		this.setState(obj);
	}

	// form submit handler

	render() {
		return (
			<div>
				<form className="new-test-form">

					<div>
						<label>Name
							<input type="text" name="inputTestName"
								value={this.state.inputTestName}
								onChange={this.inputChangeHandler} 
							/>

						</label>
					</div>

					<div>
						<label>Number of Questions
							<input type="number" name="inputQuestionCount" 
								value={this.state.inputQuestionCount}
								onChange={this.inputChangeHandler} 
							/>
						</label>
					</div>

					<div>
						<label>Time per Question</label>
						<select id="select-time-per-question" name="select-time-per-question">
							<option>no time limit</option>
							<option>5 min</option>
							<option>8 min</option>
							<option>10 min</option>
							<option>15 min</option>
						</select>
					</div>

					<div>
						<h2>Question Categories</h2>

						<input type="checkbox" name="checkbox-question-category"></input>
						<label></label>
						<input type="checkbox" name="checkbox-question-category"></input>
						<label></label>
					</div>

					<button id="button-create-test">Create</button>

					<button id="button-cancel-test">Cancel</button>


				</form>
			</div>
		)
	}
}

export default TestForm;

