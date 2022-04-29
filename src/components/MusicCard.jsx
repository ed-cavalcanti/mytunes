import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    musicasFavoritas: [],
    favorita: false,
    checked: false,
    loading1: false,
  }

  async componentDidMount() {
    const musicasFavoritas = await getFavoriteSongs();
    this.setState({
      musicasFavoritas,
      checked: false,
    });
    this.verifyFavorite();
  }

  check = () => {
    const { favorita } = this.state;
    if (favorita === true) {
      this.setState({ checked: true });
    }
  }

  verifyFavorite = () => {
    const { musicasFavoritas } = this.state;
    const { music } = this.props;
    const ids = musicasFavoritas.map((musica) => musica.trackId);
    const filter = ids.filter((id) => id === music.trackId);
    if (filter.length !== 0) {
      this.setState({ favorita: true });
    }
    this.check();
  }

  saveMusic = async () => {
    const { favorita } = this.state;
    const { music } = this.props;
    if (favorita === false) {
      this.setState({
        loading1: true,
        checked: true,
      });
      await addSong(music);
      this.setState({ loading1: false });
    }
    this.verifyFavorite();
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { checked, loading1 } = this.state;
    return (
      <div>
        {
          loading1
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
                    checked={ checked }
                    onChange={ this.saveMusic }
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
  music: propTypes.instanceOf(Object).isRequired,
};
