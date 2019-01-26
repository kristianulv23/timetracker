import * as React from "react";
import { Input } from '../shared/Input/Input';
import { classNames } from "../../../utils/utils";
import { DefaultButton } from '../shared/Button/DefaultButton/DefaultButton';
import { IWithModalContext, withModalContext } from "../../context/withModalContext";
import { signInFirebaseUser } from '../../config/firebase/auth/authentication';

interface ILoginProps extends IWithModalContext {
    authenticated: boolean;
}

interface ILoginState {
    email: string;
    password: string;
}

class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    static styleClass = {
        backdrop: classNames(
            'ulv__flex',
            'ulv__items-center',
            'ulv__fixed',
            'ulv__pin',
            'ulv__p-10',
            'ulv__z-40'
        ),
        modal: classNames(
            'ulv__bg-green-primary',
            'ulv__min-w-md',
            'ulv__max-w-lg',
            'ulv__min-h-sm',
            'ulv__m-auto',
            'ulv__z-50'
        ),
        form: classNames(
            'ulv__flex',
            'ulv__flex-col',
            'ulv__p-16'
        ),
        button: classNames(
            'ulv__bg-green-tertiary',
            'ulv__w-48'
        ),
        input: classNames(
            'ulv__mb-4'
        )
    }

    authWithFacebook() {
        console.log("We're authing with Facebook")
    }

    authWithEmailPassword(event) {
        const { updateModalState } = this.props;
        const { email, password } = this.state;
        event.preventDefault();
        signInFirebaseUser(email, password);
        updateModalState();
    }

    render() {
        const { updateModalState, modalState } = this.props;
        return (
            <React.Fragment>
                {modalState.active
                    ?
                    <div className={Login.styleClass.backdrop} style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} onClick={() => updateModalState()}>
                        <div className={Login.styleClass.modal} onClick={(e) => e.stopPropagation()}>
                            <form className={Login.styleClass.form} onSubmit={(e) => this.authWithEmailPassword(e)}>
                                <Input className={Login.styleClass.input} placeholder={'Email'} onChange={(e) => this.setState({ email: e.target.value })} />
                                <Input className={Login.styleClass.input} placeholder={'Password'} type={"password"} onChange={(e) => this.setState({ password: e.target.value })} />
                                <DefaultButton text={'Login'} className={Login.styleClass.button} type="submit" />
                            </form>
                        </div>
                    </div>
                    :
                    null
                }
            </React.Fragment>
        )
    }
}

export default withModalContext(Login);