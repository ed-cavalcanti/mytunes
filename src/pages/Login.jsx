import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';
import './Login.css';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginInput: '',
      loginButton: true,
      redirect: false,
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
    const { loginInput } = this.state;
    createUser({ name: loginInput });
    this.setState({ redirect: true });
  }

  render() {
    const { loginButton, redirect } = this.state;
    return (
      <div data-testid="page-login" className="container">
        { redirect ? <Redirect to="/search" /> : null }
        <h1 className="title">
          &#127925;
          My Tunes
        </h1>
        <p>Digite seu nome de usuário para começarmos</p>
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
