import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <p>Hello World!</p>
        </div>
      </>
    );
  }
}

export default Search;
