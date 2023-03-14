import React from 'react';
import Header from '../Components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-favorites">
          <p>Hello World!</p>
        </div>
      </div>
    );
  }
}

export default Favorites;
