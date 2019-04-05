import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { fetchLogin } from './AuthActions';
import styles from '../App.css';
import heroImgSm from '../../img/nathan-dumlao-738469-unsplash2240x3360.jpg';
import heroImgMd from '../../img/nathan-dumlao-738469-unsplash2240x2408.jpg';
import heroImgLg from '../../img/nathan-dumlao-738469-unsplash2222w.jpg';

const srcset = `${heroImgMd}, ${heroImgSm} 3x, ${heroImgSm} 2x`;

export function BackgroundImage(props) {
	return (
		<div className={styles.heroContainer}>
			<div className={styles.heroImageContainer}>
			<picture>
			  <source media="(max-width: 550px)" srcSet={heroImgSm} />
			  <source media="(min-width: 551px) && (max-width: 899px)" srcSet={heroImgMd} />
			  <source media="(min-width: 900px)" srcSet={heroImgLg} />
			  <img src={heroImgLg}
			  alt="man sitting at laptop" className={styles.heroImg} />
			</picture>
			</div>
			<div className={styles.heroCaption}>
				<p><a href="https://unsplash.com/@nate_dumlao?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Nathan Dumlao">Photo by Nathan Dumlao on Unsplash</a></p>
			</div>
		</div>

	)
}

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
			<div className={styles.loginContainer}>
				<BackgroundImage />

				{/* <h1>Login</h1> */}

				<div className={styles.formContainer}>

					{loginError && (
						<div className={styles.errorMessage}>
							{loginError}
						</div>
					)}

					<form className={styles.loginForm}>
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
