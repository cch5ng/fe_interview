import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { fetchLogin } from './AuthActions';
import styles from '../App.css';
import heroImg from '../../img/nathan-dumlao-738469-unsplash.jpg';

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
		let loginError = this.props.auth && this.props.auth.loginError ? this.props.auth.loginError : null;

		if (hasToken) {
			return (
				<Redirect to="/questions" />
			)
		}

		return (
			<div>
				<h1>Login</h1>



					{loginError && (
						<div className={styles.errorMessage}>
							{loginError}
						</div>
					)}

					<div className={styles.heroContainer}>
						<img src={heroImg} alt="man sitting at laptop" className={styles.heroImg} />
					</div>

					<form>
						<div className={styles.formGroup}>
							<label>
								Email
							</label>
							<input type="email" name="email"
								value={this.state.email}
								onChange={this.handleInputChange} />
						</div>

						<div className={styles.formGroup}>
							<label>
								Password
							</label>
							<input type="password" name="password"
								value={this.state.password}
								onChange={this.handleInputChange} />
						</div>

						<div className={styles.buttonGroup}>
							<div className={styles.leftButtonGroup}>
								<button onClick={this.submitForm}>Login</button>
							</div>
							<p>Need an account? <NavLink to="/register" className={styles.linkButton}>Register</NavLink></p>
						</div>
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
