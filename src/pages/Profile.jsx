import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Carregando from '../Components/Carregando';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loading: false,
    userData: {},
  };

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    this.setState({ loading: true });
    const userData = await getUser();
    this.setState({ loading: false, userData });
  };

  render() {
    // const { statsUser } = this.props;
    const { loading, userData } = this.state;
    return (
      <div>
        <Header />
        { loading && <Carregando />}
        <div data-testid="page-profile">
          <div>
            <img src={ userData.image } alt="" data-testid="profile-image" />
            <Link to="/profile/edit">
              Editar perfil
            </Link>
          </div>
          <label htmlFor="name">
            Nome:
            <p id="name">{ userData.name }</p>
          </label>
          <label htmlFor="email">
            E-mail:
            <p id="email">{ userData.email }</p>
          </label>
          <label htmlFor="description">
            Description:
            <p id="description">{ userData.description }</p>
          </label>
        </div>
      </div>
    );
  }
}

export default Profile;
