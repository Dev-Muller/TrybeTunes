import React from 'react';
import Header from '../Components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-profile-edit">
          <p>Hello World!</p>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
