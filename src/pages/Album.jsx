import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './Album.css';

export default class Album extends Component {
  state = {
    musicList: [],
    collection: [],
    favoriteSongs: [],
  }

  componentDidMount() {
    this.searchMusics();
  }

  searchMusics= async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const data = await getMusics(`${id}`);
    const favoritos = await getFavoriteSongs();
    this.setState({
      musicList: data,
      collection: data[0],
      favoriteSongs: favoritos,
    });
    console.log(data[0]);
  }

  render() {
    const { musicList, collection, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <section className="album-header">
            <div>
              <h3 data-testid="album-name">{ collection.collectionName }</h3>
              <h4 data-testid="artist-name">{ collection.artistName }</h4>
            </div>
            <img
              className="album-image"
              src={ collection.artworkUrl100 }
              alt={
                `Capa do álbum ${collection.collectionName} do
                artista ${collection.artistName}`
              }
            />
          </section>
          <section className="track-container">
            {
              musicList.map((music, index) => {
                if (index === 0) {
                  return null;
                }
                return (
                  <MusicCard
                    key={ index }
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    trackId={ music.trackId }
                    music={ music }
                    favoriteSongs={ favoriteSongs }
                  />
                );
              })
            }
          </section>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
};
