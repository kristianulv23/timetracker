import * as React from 'react';
import { Input } from '../shared/Input/Input';
import { classNames, getFirebaseErrorMessage } from '../../../utils/utils';
import { DefaultButton } from '../shared/Button/DefaultButton/DefaultButton';
import { signInFirebaseUser } from '../../firebase/auth/authentication';
import {
  IWithLoaderContext,
  withLoaderContext
} from '../../context/withLoaderContext';
import { RouteEnum } from '../../routes/RouteEnums';

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
      'md__ulv__absolute',
      'md__ulv__pin',
      'md__ulv__m-auto',
      'ulv__bg-green-primary',
      'md__ulv__min-w-98',
      'md__ulv__max-w-xs',
      'md__ulv__max-h-sm',
      'ulv__w-screen',
      'ulv__h-screen',
      'ulv__relative',
      'md__ulv__w-full',
      'md__ulv__h-full',
      'login'
    ),
    form: classNames('ulv__flex', 'ulv__flex-col', 'ulv__p-16', 'ulv__justify-center', 'ulv__w-full', 'ulv__absolute', 'ulv__pin'),
    loginButton: classNames('ulv__bg-green-tertiary-3', 'ulv__w-full', 'hover__ulv__bg-green-tertiary-4', 'ulv__my-2', 'ulv__text-center', 'ulv__cursor-pointer'),
    registerButton: classNames('ulv__bg-blue-primary', 'ulv__w-full', 'hover__ulv__bg-blue-secondary', 'ulv__my-2', 'ulv__text-center', 'ulv__cursor-pointer'),
    input: classNames('ulv__mb-4')
  };

  authWithEmailPassword(event) {
    event.preventDefault();
    const { updateLoaderState } = this.props;
    const { email, password } = this.state;
    updateLoaderState();

    signInFirebaseUser(email, password)
      .then(() => { updateLoaderState() })
      .catch(e => {
        const message = getFirebaseErrorMessage(e.code);
        this.setState({ 
          message 
        }, () => updateLoaderState());
      });
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
            className={Login.styleClass.loginButton}
            type='submit'
          />
          <DefaultButton
            text={'Registrer bruker'}
            className={Login.styleClass.registerButton}
            link={true}
            linkTo={RouteEnum.SIGNUP}
          />
        </form>
        {message ?
          <div className={'ulv__mx-16 ulv__bg-white ulv__p-2'}>
            <p className={'ulv__p-2 ulv__text-center'}>{message}</p>
          </div>
          :
          null
        }
      </div>
    );
  }
}

export default withLoaderContext(Login);
