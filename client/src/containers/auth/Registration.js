/**
 * @prettier
 */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { fetchRegister, clearLoginError } from './AuthActions';
import styles from '../App.css';

const initState = {
  email: '',
  password: '',
  emailError: null,
  passwordError: null,
};

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailError: null,
      passwordError: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.resetState = this.resetState.bind(this);
    //this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.submitForm2 = this.submitForm2.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(clearLoginError());
  }

  handleInputChange(ev) {
    let name = ev.target.name;
    let value = ev.target.value;

    this.setState({ [name]: value });
  }

  submitForm(ev) {
    ev.preventDefault();

    // validate email
    if (this.state.email === '') {
      this.setState({ emailError: 'Email should not be empty' });
    } else if (this.state.email.length > 0) {
      this.setState({ emailError: null });
    }

    // validate password
    if (this.state.password === '') {
      this.setState({ passwordError: 'Password should not be empty' });
    } else if (this.state.password.length > 0) {
      let pwdErr = this.state.passwordError;
      if (pwdErr && pwdErr.indexOf('Password should not be empty') > -1) {
        pwdErr = pwdErr.replace('Password should not be empty', '');

        this.setState({ passwordError: pwdErr }, () => {
          if (this.validatePassword()) {
            this.submitForm2();
          } else {
            this.setState((state, props) => ({
              passwordError:
                'The password must include one number, one letter, one special character including !@#$%^&*',
            }));
          }
        });
      } else {
        if (this.validatePassword()) {
          this.setState({ passwordError: null }, () => {
            this.submitForm2();
          });
        } else {
          this.setState((state, props) => ({
            passwordError:
              'The password must include one number, one letter, one special character including !@#$%^&*',
          }));
        }
      }
    } else if (!this.state.passwordError && !this.state.emailError) {
      this.submitForm2();
    }
  }

  submitForm2() {
    let login = { email: this.state.email, password: this.state.password };

    if (
      !this.state.emailError &&
      (!this.state.passwordError || this.state.passwordError === '')
    ) {
      this.props.dispatch(fetchRegister(login));
      this.resetState();
    }
  }

  // validateEmail() {
  // }

  validatePassword() {
    let { password } = this.state;
    let regex1 = /[\d]+/g;
    let regex2 = /[\D]+/g;
    let regex3 = /[!@#$%^&*]+/g;

    if (
      password.search(regex1) > -1 &&
      password.search(regex2) > -1 &&
      password.search(regex3) > -1
    ) {
      return true;
    }
    return false;
  }

  resetState() {
    this.setState(initState);
  }

  render() {
    let userIsRegistered =
      this.props.auth && this.props.auth.userRegistered ? true : false;

    let registrationError =
      this.props.auth && this.props.auth.registrationError
        ? this.props.auth.registrationError
        : null;

    if (userIsRegistered) {
      return <Redirect to="/login" />;
    }

    return (
      <div className={styles.registrationContainer}>
        {registrationError && (
          <div className={styles.errorMessage}>{registrationError}</div>
        )}

        <form>
          <div className={styles.formGroup}>
            <label>New Account Email</label>
            {this.state.emailError && (
              <div className={styles.errorMessage}>{this.state.emailError}</div>
            )}
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              minLength="5"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            {this.state.passwordError && (
              <div className={styles.errorMessage}>
                {this.state.passwordError}
              </div>
            )}
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              minLength="8"
              required
            />

            <p className={styles.requirements}>
              (min 8 characters, with one number, one letter, one special
              character including !@#$%^&*)
            </p>
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={this.submitForm}>Register</button>
            <p className={styles.loginText}>
              Already have an account?{' '}
              <NavLink to="/login" className={styles.linkButton}>
                Login
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Registration);
