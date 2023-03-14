import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  state = {
    disabled: true,
  };

  onInputChange = ({ target }) => {
    const MINNumber = 2;
    const valor = target.value;
    this.setState({ [target.name]: valor, disabled: valor.length < MINNumber });
  };

  render() {
    const { disabled } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form action="">
            <input
              name="artistName"
              type="text"
              data-testid="search-artist-input"
              onChange={ this.onInputChange }
              placeholder="Nome do Artista"
            />
            <button
              disabled={ disabled }
              type="submit"
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
