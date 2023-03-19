import React from 'react';
import { PropTypes } from 'prop-types';
import Header from '../Components/Header';
import Carregando from '../Components/Carregando';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    name: '',
    email: '',
    description: '',
    image: '',
    isDisabled: true,
  };

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    this.setState({ loading: true });
    const userData = await getUser();
    this.setState({ loading: false, ...userData });
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ [target.name]: value }, this.validateInputs);
  };

  validateInputs = () => {
    const { name, email, description, image } = this.state;
    const minNumber = 2;
    const valName = name.length > minNumber;
    const valEmail = email.length > minNumber;
    const valDescription = description.length > minNumber;
    const valImage = image.length > minNumber;
    if (valName && valEmail && valDescription && valImage) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  onClickInput = async () => {
    const { name, email, description, image } = this.state;
    const { history } = this.props;
    await updateUser({ name, email, description, image });
    history.push('/profile');
  };

  render() {
    const { loading, name, email, description, image, isDisabled } = this.state;
    return (
      <div>
        <Header />
        { loading && <Carregando />}
        <div data-testid="page-profile-edit">
          <form>
            <label htmlFor="name">
              <h3>Nome:</h3>
              <h5>Fique a vontade a usar seu nome social.</h5>
              <input
                type="text"
                id="name"
                name="name"
                data-testid="edit-input-name"
                placeholder="Insira seu nome"
                value={ name }
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="email">
              <h3>E-mail:</h3>
              <h5>Escolha um e-mail que voce verifique diariament.</h5>
              <input
                type="email"
                id="email"
                name="email"
                data-testid="edit-input-email"
                placeholder="usuario@usuario.com"
                value={ email }
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="description">
              <h3>Description:</h3>
              <h5>Insira sua descricao</h5>
              <textarea
                type="text"
                id="description"
                name="description"
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="image">
              Escolha sua imagem de perfil:
              <input
                type="text"
                name="image"
                id="image"
                src=""
                alt=""
                data-testid="edit-input-image"
                placeholder="O link da sua image de perfil aqui"
                value={ image }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              type="button"
              disabled={ isDisabled }
              data-testid="edit-button-save"
              onClick={ this.onClickInput }
            >
              Editar perfil
            </button>
          </form>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
