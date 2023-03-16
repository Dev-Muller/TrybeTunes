import React from 'react';
import Header from '../Components/Header';
import Carregando from '../Components/Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../Components/MusicCard';

class Favorites extends React.Component {
  state = {
    list: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const favSong = await getFavoriteSongs();
    this.setState({ loading: false });
    this.setState({ list: favSong });
  }

  updateFavorite = async () => {
    const newFavList = await getFavoriteSongs();
    this.setState({ list: newFavList });
  };

  render() {
    const { list, loading } = this.state;
    return (
      <div>
        <Header />
        { loading && <Carregando />}
        <div data-testid="page-favorites">
          { list.map((music) => (
            <MusicCard
              key={ music.trackId }
              music={ music }
              update={ this.updateFavorite }
            />
          )) }
        </div>
      </div>
    );
  }
}

export default Favorites;
