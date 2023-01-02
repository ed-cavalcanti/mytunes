import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import './MusicCard.css';

export default class MusicCard extends Component {
  state = {
    loading: false,
    musicaFavotira: false,
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = () => {
    const { favoriteSongs, trackId } = this.props;
    const song = favoriteSongs.some(({ trackId: id }) => id === trackId);
    this.setState({ musicaFavotira: song });
  }

  handleCheck = ({ target }) => {
    const { checked } = target;
    this.setState({
      musicaFavotira: checked,
      loading: true,
    });
    this.saveOrDeleteMusic();
  }

  async saveOrDeleteMusic() {
    const { music, apiRequest } = this.props;
    const { musicaFavotira } = this.state;

    if (musicaFavotira) {
      await removeSong(music);
    } else {
      await addSong(music);
    }
    this.setState({ loading: false });
    if (apiRequest) {
      await apiRequest();
    }
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { musicaFavotira, loading } = this.state;
    return (
      <div>
        {
          loading
            ? <p className="loading-text">Carregando...</p>
            : (
              <div className="track-wrapper">
                <span>{ trackName }</span>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track
                    kind="captions"
                  />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>
                <label htmlFor="favorita">
                  Adicionar as favoritas
                  <input
                    data-testid={ `checkbox-music-${trackId}` }
                    type="checkbox"
                    id="favorita"
                    checked={ musicaFavotira }
                    onChange={ this.handleCheck }
                  />
                </label>
              </div>
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  favoriteSongs: propTypes.instanceOf(Object).isRequired,
  music: propTypes.instanceOf(Object).isRequired,
  apiRequest: propTypes.func,
};

MusicCard.defaultProps = {
  apiRequest: null,
};
