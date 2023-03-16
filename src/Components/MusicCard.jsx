import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends Component {
  state = {
    loading: false,
    favorite: false,
  };

  async componentDidMount() {
    const { music } = this.props;
    this.setState({ loading: true });
    const favSong = await getFavoriteSongs();
    this.setState({ loading: false });
    if (favSong.some((fav) => (fav.trackName === music.trackName))) {
      this.setState({ favorite: true });
    }
  }

  getAddSong = async () => {
    const { music } = this.props;
    const { favorite } = this.state;
    if (favorite) {
      this.setState({ loading: true });
      await addSong(music);
      this.setState({ loading: false });
    }
  };

  removeFavSong = async () => {
    const { music } = this.props;
    const { favorite } = this.state;
    if (!favorite) {
      this.setState({ loading: true });
      await removeSong(music);
      this.setState({ loading: false });
    }
  };

  onInputChange = ({ target }) => {
    const { checked, name } = target;
    this.setState({ [name]: checked }, () => {
      const { update } = this.props;
      this.getAddSong();
      this.removeFavSong();
      update();
    });
  };

  render() {
    const { music } = this.props;
    const { loading, favorite } = this.state;
    return (
      <div>
        { loading && <Carregando /> }
        <p>{ music.trackName }</p>
        <label htmlFor="favorita">
          <input
            type="checkbox"
            name="favorite"
            checked={ favorite }
            id="favorita"
            data-testid={ `checkbox-music-${music.trackId}` }
            onChange={ this.onInputChange }
          />
          Favorita
        </label>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  update: PropTypes.func,
};

MusicCard.defaultProps = { update: () => {} };

export default MusicCard;
