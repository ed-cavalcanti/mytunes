import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    checked: false,
    loading1: false,
  }

  saveMusic = async () => {
    const { checked } = this.state;
    if (checked === true) {
      this.setState({ checked: false });
    } else if (checked === false) {
      this.setState({
        checked: true,
        loading1: true,
      });
      await addSong();
      this.setState({ loading1: false });
    }
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
};
