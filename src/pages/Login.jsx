import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginInput: '',
      loginButton: true,
      loading: false,
      unloading: false,
    };
  }

  handleChange = (event) => {
    this.verifyCaracteres();
    const key = event.target.name;
    this.setState({ [key]: event.target.value });
  }

  verifyCaracteres = () => {
    const { loginInput } = this.state;
    if (loginInput.length > 1) {
      this.setState({ loginButton: false });
    } else {
      this.setState({ loginButton: true });
    }
  }

  LoginButtonClick = () => {
    const waitTime = 1000;
    this.setState({ loading: true });
    const { loginInput } = this.state;
    createUser({ name: loginInput });
    setTimeout(() => {
      this.setState({ unloading: true });
    }, waitTime);
  }

  render() {
    const { loginButton, loading, unloading } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : null }
        { unloading ? <Redirect to="/search" /> : null }
        <form>
          <input
            name="loginInput"
            type="text"
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ loginButton }
            onClick={ this.LoginButtonClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
