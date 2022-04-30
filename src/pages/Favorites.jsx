import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusciCard from '../components/MusicCard';

export default class Favorites extends Component {
  state = {
    favoriteList: [],
    loading: true,
  }

  componentDidMount() {
    this.apiRequest();
  }

  apiRequest = async () => {
    this.setState({ loading: true });
    const data = await getFavoriteSongs();
    this.setState({
      favoriteList: data,
      loading: false,
    });
  }

  render() {
    const { favoriteList, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <section>
          {
            loading
              ? <Loading />
              : favoriteList.map((music, index) => (
                <MusciCard
                  key={ index }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  music={ music }
                  favoriteSongs={ favoriteList }
                  apiRequest={ this.apiRequest }
                />
              ))
          }
        </section>
      </div>
    );
  }
}
