import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLogin } from './AuthActions';

const initState = {
	email: '',
	password: ''
}


class Login extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.resetState = this.resetState.bind(this);

	}

	handleInputChange(ev) {
		let name = ev.target.name;
		let value = ev.target.value;

		this.setState({[name]: value})
	}

	submitForm(ev) {
		ev.preventDefault();

		let login = {email: this.state.email, password: this.state.password};

		//call action to send to BE
		this.props.dispatch(fetchLogin(login));
		this.resetState();

		// probably want to redirect

	}

	resetState() {
		this.setState(initState);
	}

	render() {

		return (
			<div>
				<h1>Login</h1>

					<form>
						<div>
							<label>
								Email

								<input type="email" name="email"
									value={this.state.email}
									onChange={this.handleInputChange} />

							</label>
						</div>

						<div>
							<label>
								Password
								<input type="password" name="password"
									value={this.state.password}
									onChange={this.handleInputChange} />

							</label>
						</div>

						<button onClick={this.submitForm}>Register</button>
					</form>

			</div>
		)
	}

}

function mapStateToProps({ auth }) {
	return {
		auth
	}
}

export default connect(mapStateToProps)(Login);
