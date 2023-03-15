import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends React.Component {
  state = {
    list: [{ artistName: '', collectionName: '' }],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const searchAPI = await getMusics(id);
    this.setState({ list: searchAPI });
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          <h2 data-testid="artist-name">{ list[0].artistName }</h2>
          <h3 data-testid="album-name">{ list[0].collectionName }</h3>
          { list.slice(1).map((music) => (
            <MusicCard key={ music.trackId } music={ music } />
          )) }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
