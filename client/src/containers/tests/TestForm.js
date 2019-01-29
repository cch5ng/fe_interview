import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { fetchTests } from './TestActions';

class TestForm extends Component {

	constructor(props) {
		super(props);

		this.state = {
			inputTestName: '',
			inputQuestionCount: 0,
			selectTimePerQuestion: 'no limit'
		}

		this.handleInputChange = this.handleInputChange.bind(this);
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

