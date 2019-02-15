import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { fetchRegister } from './AuthActions';
import styles from '../App.css';

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
		let userIsRegistered = this.props.auth && this.props.auth.userRegistered ? true : false;

		if (userIsRegistered) {
			return (
				<Redirect to="/login" />
			)
		}


		return (
			<div>
				<h1>Registration</h1>

				<form>
					<div className={styles.formGroup}>
						<label>
							New Account Email
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
							<button onClick={this.submitForm}>Register</button>
						</div>
						<p>Already have an account? <NavLink to="/login" className={styles.linkButton}>Login</NavLink></p>
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

export default connect(mapStateToProps)(Registration);
