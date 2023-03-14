import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  state = {
    loading: false,
    user: {},
  };

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    this.setState({ loading: true });
    const usuario = await getUser();
    this.setState({ loading: false, user: usuario });
  };

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <ul>
            <li><Link to="/search" data-testid="link-to-search">Search</Link></li>
            <li>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favorites
              </Link>
            </li>
            <li><Link to="/profile" data-testid="link-to-profile">Profile</Link></li>
          </ul>
        </nav>
        { loading && <Carregando /> }
        <div>
          <p data-testid="header-user-name">{ user.name }</p>
        </div>
      </header>
    );
  }
}

export default Header;
