import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
            ? <Loading />
            : (
              <div>
                <h3 data-testid="header-user-name">{`Olá, ${name.name}`}</h3>
                <ul>
                  <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
                  <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
                  <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
                </ul>
              </div>
            )
        }
      </header>
    );
  }
}
