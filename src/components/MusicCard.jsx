import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

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
    const { music } = this.props;
    const { musicaFavotira } = this.state;

    if (musicaFavotira) {
      await removeSong(music);
      console.log('removeu');
    } else {
      await addSong(music);
      console.log('adicionou');
    }
    this.setState({ loading: false });
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { musicaFavotira, loading } = this.state;
    return (
      <div>
        {
          loading
            ? <Loading />
            : (
              <div>
                <span>{ trackName }</span>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track
                    kind="captions"
                  />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>
                <label htmlFor="favorita">
                  Favorita
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
};
