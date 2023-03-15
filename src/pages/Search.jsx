import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Carregando from '../Components/Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    disabled: true,
    loading: false,
    name: '',
    nameInput: '',
    albumList: [],
    result: false,
  };

  onInputChange = ({ target }) => {
    const MINNumber = 2;
    const valor = target.value;
    this.setState({ [target.name]: valor, disabled: valor.length < MINNumber });
  };

  handlerBtn = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({ loading: true, name });
    const searchAPI = await searchAlbumsAPI(name);
    this.setState({
      loading: false,
      nameInput: name,
      name: '',
      albumList: searchAPI,
      result: true });
  };

  render() {
    const { disabled, loading, nameInput, name, albumList, result } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          { loading && <Carregando /> }
          <form action="">
            <label htmlFor="">
              <input
                name="name"
                type="text"
                value={ name }
                data-testid="search-artist-input"
                onChange={ this.onInputChange }
                placeholder="Nome do Artista"
              />
              <button
                disabled={ disabled }
                type="button"
                data-testid="search-artist-button"
                onClick={ this.handlerBtn }
              >
                Pesquisar
              </button>
            </label>
          </form>
          { result && <p>{ `Resultado de álbuns de: ${nameInput}` }</p>}
          <ul>
            { albumList
              .length === 0 ? <li>Nenhum álbum foi encontrado</li>
              : albumList.map((album) => (
                <li
                  key={ album.collectionId }
                >
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    {album.collectionName}
                    <img src={ album.artworkUrl100 } alt="" />
                  </Link>
                </li>
              )) }
          </ul>

        </div>
      </>
    );
  }
}

export default Search;
