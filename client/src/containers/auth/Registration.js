import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRegister } from './AuthActions';

const initState = {
	email: '',
	password: ''
}

class Registration extends Component {

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

		console.log('button clicked')

		let login = {email: this.state.email, password: this.state.password};

		//call action to send to BE
		this.props.dispatch(fetchRegister(login));
		this.resetState();

		//TODO see if alt way to do this
		//this.props.history.push('/login');
	}

	resetState() {
		this.setState(initState);
	}

	render() {

		let authentication = this.props.auth;
		console.log('authentication', authentication)

			// { authentication.userRegistered && (
			// 	<Link to="/tests" />
			// )}

			// {auth && auth.userRegistered === false && (
			// )}


		return (

				<div>
					<h1>Registration</h1>

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

export default connect(mapStateToProps)(Registration);
