import * as React from 'react';
import { Input } from '../shared/Input/Input';
import { classNames } from '../../../utils/utils';
import { DefaultButton } from '../shared/Button/DefaultButton/DefaultButton';
import { signInFirebaseUser } from '../../config/firebase/auth/authentication';
import {
  IWithLoaderContext,
  withLoaderContext
} from '../../context/withLoaderContext';

interface ILoginProps extends IWithLoaderContext {

}

interface ILoginState {
  email: string;
  password: string;
}

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
    button: classNames('ulv__bg-green-tertiary', 'ulv__w-full', 'hover__ulv__bg-green-secondary'),
    input: classNames('ulv__mb-4')
  };

  authWithEmailPassword(event) {
    event.preventDefault();
    const {updateLoaderState} = this.props;
    const { email, password } = this.state;
    updateLoaderState();
    signInFirebaseUser(email, password).then(() => {
      updateLoaderState();
    });
  }

  render() {
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
        </form>
      </div>
    );
  }
}

export default withLoaderContext(Login);
