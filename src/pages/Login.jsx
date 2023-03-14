import React from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from '../Components/Carregando';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    LogName: '',
    disabled: true,
    loading: false,
    loaded: false,
  };

  onInputChange = ({ target }) => {
    const MINNumber = 3;
    const valor = target.value;
    this.setState({ [target.name]: valor, disabled: valor.length < MINNumber });
  };

  verifyUser = async (event) => {
    const { LogName } = this.state;
    event.preventDefault();
    this.setState({ loading: true });
    await createUser({ name: LogName });
    this.setState({ loading: false, loaded: true });
  };

  render() {
    const { disabled, LogName, loading, loaded } = this.state;
    return (
      <div data-testid="page-login">
        <form action="">
          <input
            name="LogName"
            type="text"
            value={ LogName }
            data-testid="login-name-input"
            onChange={ this.onInputChange }
          />
          <button
            disabled={ disabled }
            type="submit"
            data-testid="login-submit-button"
            onClick={ this.verifyUser }
          >
            Entrar
          </button>
        </form>
        { loading && <Carregando /> }
        { loaded && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
