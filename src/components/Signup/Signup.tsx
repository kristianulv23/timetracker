import * as React from 'react';
import { Input } from '../shared/Input/Input';
import { classNames, getFirebaseErrorMessage } from '../../../utils/utils';
import { DefaultButton } from '../shared/Button/DefaultButton/DefaultButton';
import { RouteEnum } from '../../routes/RouteEnums';


import { createFirebaseUser } from '../../firebase/auth/authentication';
import {
  IWithLoaderContext,
  withLoaderContext
} from '../../context/withLoaderContext';

interface ISignupProps extends IWithLoaderContext {

}

interface ISignupState {
  email: string;
  password: string;
  message: string;
}

class Signup extends React.Component<ISignupProps, ISignupState> {
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
    backButton: classNames('ulv__p-8 ulv__z-10 ulv__text-left ulv__absolute md__ulv__inherit', 'ulv__pin-r'),
    registerButton: classNames('ulv__bg-blue-primary', 'ulv__w-full', 'hover__ulv__bg-blue-secondary', 'ulv__my-2', 'ulv__text-center', 'ulv__cursor-pointer'),
    input: classNames('ulv__mb-4')
  };

  createFirebaseUser(event) {
    event.preventDefault();
    const { updateLoaderState } = this.props;
    const { email, password } = this.state;

    updateLoaderState();
    createFirebaseUser(email, password)
      .then((user) => {
        this.setState({
          message: `Bruker ${user.user.displayName} laget.`
        }, () => updateLoaderState());
      })
      .catch((e) => {
        const message = getFirebaseErrorMessage(e.code);
        this.setState({
          message
        }, () => updateLoaderState());
      })
  }

  render() {
    const { message } = this.state;
    return (
      <div className={Signup.styleClass.formWrapper}>
        <DefaultButton
          text={'tilbake'}
          className={Signup.styleClass.backButton}
          link={true}
          linkTo={RouteEnum.LOGIN}
        />
        <form
          className={Signup.styleClass.form}
          onSubmit={e => this.createFirebaseUser(e)}
          autoComplete="off"
        >
          <Input
            className={Signup.styleClass.input}
            placeholder={'Epost'}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Input
            className={Signup.styleClass.input}
            placeholder={'Passord'}
            type={'password'}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <DefaultButton
            text={'Registrer'}
            className={Signup.styleClass.registerButton}
            type={'submit'}
          />
          {message ?
            <div className={'ulv__m-0 ulv__mt-4 md__ulv__mx-16 ulv__bg-white ulv__p-2'}>
              <p className={'ulv__p-2 ulv__text-center ulv__text-red'}>{message}</p>
            </div>
            :
            null
          }
        </form>
      </div>
    );
  }
}

export default withLoaderContext(Signup);
