import * as React from 'react';
import { Input } from '../shared/Input/Input';
import { classNames } from '../../../utils/utils';
import { DefaultButton } from '../shared/Button/DefaultButton/DefaultButton';
import { signInFirebaseUser, createFirebaseUser } from '../../firebase/auth/authentication';
import {
  IWithLoaderContext,
  withLoaderContext
} from '../../context/withLoaderContext';

interface ILoginProps extends IWithLoaderContext {

}

interface ILoginState {
  email: string;
  password: string;
  message: string;
}

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: ''
    };
  }

  static styleClass = {
    formWrapper: classNames(
      'ulv__absolute',
      'ulv__pin',
      'ulv__m-auto',
      'ulv__bg-green-primary',
      'ulv__min-w-98',
      'ulv__max-w-xs',
      'ulv__max-h-sm',
      'login'
    ),
    form: classNames('ulv__flex', 'ulv__flex-col', 'ulv__p-16'),
    button: classNames('ulv__bg-blue-primary', 'ulv__w-full', 'hover__ulv__bg-blue-secondary', 'ulv__my-2'),
    input: classNames('ulv__mb-4')
  };

  authWithEmailPassword(event) {
    event.preventDefault();
    const { updateLoaderState } = this.props;
    const { email, password } = this.state;
    updateLoaderState();
    
    signInFirebaseUser(email, password).then(() => {
      updateLoaderState();
    }).catch(() => {
      this.setState({
        message: 'Ugyldig bruker, vennligst prøv igjen.'
      })
      updateLoaderState();
    });
  }

  createFirebaseUser() {
    const { updateLoaderState } = this.props;
    const { email, password } = this.state;

    updateLoaderState();
    createFirebaseUser(email, password).then((user) => {
      this.setState({
        message: `Bruker ${user.user.displayName} laget.`
      })
      updateLoaderState();
    }).catch((e) => {
      this.setState({
        message: 'Noe gikk galt, vennligst prøv igjen.'
      })
      updateLoaderState();
    })
  }

  render() {
    const { message } = this.state;
    return (
      <div className={Login.styleClass.formWrapper}>
        <form
          className={Login.styleClass.form}
          onSubmit={e => this.authWithEmailPassword(e)}
        >
          <Input
            className={Login.styleClass.input}
            placeholder={'Epost'}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Input
            className={Login.styleClass.input}
            placeholder={'Passord'}
            type={'password'}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <DefaultButton
            text={'Logg inn'}
            className={Login.styleClass.button}
            type='submit'
          />
          <DefaultButton
            text={'Registrer bruker'}
            className={Login.styleClass.button}
            type={'button'}
            onClick={() => this.createFirebaseUser()}
          />
        </form>
        {message ?
          <div className={'ulv__mx-16 ulv__bg-white ulv__p-2'}>
            <p className={'ulv__p-2'}>{message}</p>
          </div>
          :
          null
        }

      </div>
    );
  }
}

export default withLoaderContext(Login);
