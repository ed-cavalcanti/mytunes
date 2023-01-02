import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './AlbumCard.css';

export default class AlbumCard extends Component {
  render() {
    const { info } = this.props;
    const {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } = info;
    return (
      <div className="album-card">
        <img
          src={ artworkUrl100 }
          alt={ `Imagem da capa do álbum ${collectionName} do(a) artista ${artistName}` }
        />
        <h5>{ collectionName }</h5>
        <span>{ artistName }</span>
        <Link
          className="see-more"
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Ver mais
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  info: PropTypes.instanceOf(Object).isRequired,
};
