import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    inputValue: '',
    loginButton: true,
  }

  verifyCaracteres = () => {
    const { inputValue } = this.state;
    if (inputValue.length > 0) {
      this.setState({ loginButton: false });
    } else {
      this.setState({ loginButton: true });
    }
  }

  handleChange = (event) => {
    this.verifyCaracteres();
    const key = event.target.name;
    this.setState({ [key]: event.target.value });
  }

  render() {
    const { inputValue, loginButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            name="inputValue"
            value={ inputValue }
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            placeholder="Nome do artista"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ loginButton }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
