import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    musicList: [],
    collection: [],
  }

  componentDidMount() {
    this.searchMusics();
  }

  searchMusics= async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const data = await getMusics(`${id}`);
    this.setState({
      musicList: data,
      collection: data[0],
    });
  }

  render() {
    const { musicList, collection } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <h3 data-testid="album-name">{ collection.collectionName }</h3>
          <h4 data-testid="artist-name">{ collection.artistName }</h4>
        </section>
        <section>
          {
            musicList.map(({ trackName, previewUrl }, index) => {
              if (index === 0) {
                return <span key={ 0 }>TrackList:</span>;
              }
              return (
                <MusicCard
                  key={ index }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                />
              );
            })
          }
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
};
