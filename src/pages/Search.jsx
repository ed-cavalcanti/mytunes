import React, { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';
import './Search.css';

export default class Search extends Component {
  state = {
    inputValue: '',
    artistName: '',
    loginButton: true,
    loading: false,
    hidden: false,
    data: [],
  }

  searchAlbum = async () => {
    const { inputValue } = this.state;
    this.setState({
      artistName: inputValue,
      loading: true,
      inputValue: '',
      hidden: true,
    });
    const searchData = await searchAlbumsAPI(inputValue);
    this.setState({
      data: searchData,
      loading: false,
      hidden: false,
    });
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
    const { inputValue, artistName, loginButton, loading, hidden, data } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form className="search-form" hidden={ hidden }>
          <input
            className="search-input"
            name="inputValue"
            value={ inputValue }
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            placeholder="Busque álbuns pelo nome do artista"
          />
          <button
            className="search-button"
            type="button"
            data-testid="search-artist-button"
            disabled={ loginButton }
            onClick={ this.searchAlbum }
          >
            Pesquisar
          </button>
        </form>
        { loading ? <Loading /> : null }
        {
          data.length === 0
            ? <h3 className="main-title">Nenhum álbum foi encontrado</h3>
            : (
              <div>
                <h3
                  className="main-title"
                >
                  { `Resultado de álbuns de: ${artistName}` }
                </h3>
                <div className="cards-container">
                  {
                    data.map((album, i) => <AlbumCard key={ i } info={ album } />)
                  }
                </div>
              </div>
            )
        }
      </div>
    );
  }
}
