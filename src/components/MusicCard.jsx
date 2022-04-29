import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { previewUrl, trackName } = this.props;
    return (
      <div>
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track
            kind="captions"
          />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
};
