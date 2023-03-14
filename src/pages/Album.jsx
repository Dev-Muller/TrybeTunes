import React from 'react';
import Header from '../Components/Header';

class Album extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          <p>Hello World!</p>
        </div>
      </div>
    );
  }
}

export default Album;
