import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './Header.css';

export default class Header extends Component {
  state = {
    name: '',
    loading: false,
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const name = await getUser();
    this.setState({ name });
    this.setState({ loading: false });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading
            ? null
            : (
              <div className="header-content">
                <div>
                  <span className="hi">Olá, </span>
                  <span className="hi" data-testid="header-user-name">{name.name}</span>
                </div>
                <div className="navbar">
                  <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
                  <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
                  <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
                </div>
              </div>
            )
        }
      </header>
    );
  }
}
