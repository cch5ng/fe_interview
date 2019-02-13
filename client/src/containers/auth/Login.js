import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
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

		if (this.state.email.length && this.state.password.length) {
			let login = {email: this.state.email, password: this.state.password};
			this.props.dispatch(fetchLogin(login));
			this.resetState();			
		}
	}

	resetState() {
		this.setState(initState);
	}

	render() {
		let hasToken = this.props.auth && this.props.auth.jwt ? true : false;

		if (hasToken) {
			return (
				<Redirect to="/questions" />
			)
		}

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

function mapStateToProps(state) {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Login);
