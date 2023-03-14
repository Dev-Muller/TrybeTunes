import React from 'react';
import Header from '../Components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-profile">
          <p>Hello World!</p>
        </div>
      </div>
    );
  }
}

export default Profile;
