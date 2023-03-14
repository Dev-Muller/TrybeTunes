import React from 'react';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  state = {
    loading: false,
    loaded: false,
    user: {},
  };

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    this.setState({ loading: true });
    const usuario = await getUser();
    this.setState({ loading: false, loaded: true, user: usuario });
  };

  render() {
    const { loading, loaded, user } = this.state;
    return (
      <header data-testid="header-component">
        <div>
          { loading && <Carregando /> }
          <p data-testid="header-user-name">
            { loaded && <p>{ user.name }</p> }
          </p>
        </div>
      </header>
    );
  }
}

export default Header;
