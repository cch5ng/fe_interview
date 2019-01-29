import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { fetchTests } from './TestActions';

class TestForm extends Component {

	constructor(props) {
		super(props);
	}

	//event handlers

	// input change handler

	// form submit handler

	render() {
		return (
			<div>
				<form className="new-test-form">

					<div>
						<label>Name</label>
						<input type="text" name="input-test-name"></input>
					</div>

					<div>
						<label>Number of Questions</label>
						<select id="select-question-count">
							<option></option>
							<option></option>
							<option></option>
							<option></option>
						</select>
					</div>

					<div>
						<label>Time per Question</label>
						<select id="select-time-per-question" name="select-time-per-question">
							<option></option>
							<option></option>
							<option></option>
							<option></option>
						</select>
					</div>

					<div>
						<h2>Question Categories</h2>

						<input type="checkbox" name="checkbox-question-category">category1</input>
						<label></label>
						<input type="checkbox" name="checkbox-question-category">category2</input>
						<label></label>
					</div>

					<button id="button-create-test">Create</button>

					<button id="button-cancel-test">Cancel</button>


				</form>
			</div>
		)
	}

}


