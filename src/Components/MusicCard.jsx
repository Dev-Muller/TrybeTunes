import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends Component {
  state = {
    loading: false,
    // songList: [],
  };

  componentDidMount() {
    // this.getSong();
  }

  getSong = async (song) => {
    this.setState({ loading: true });
    // const add =
    await addSong(song);
    this.setState({ loading: false });
  };

  render() {
    const { music } = this.props;
    const { loading } = this.state;
    return (
      <div>
        { loading && <Carregando /> }
        <p>{ music.trackName }</p>
        <label htmlFor="">
          <input
            type="checkbox"
            name="favorite"
            id=""
            data-testid={ `checkbox-music-${music.trackId}` }
            onClick={ () => this.getSong(music) }
          />
          Favorite
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
};

export default MusicCard;
