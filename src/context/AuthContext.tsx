import * as React from "react";
import * as firebase from 'firebase';
import { Component, createContext } from 'react';

export interface IAuthProps {
    authUser?: any;
}

export interface IAuthState {
    authUser?: any;
}

export interface IAuthContext {
    authState: IAuthState;
}

const AuthContext = createContext<IAuthContext>(null);

export const AuthConsumer = AuthContext.Consumer;

class AuthContextProvider extends Component<IAuthProps, IAuthState> {

    constructor(props: any) {
        super(props);

        this.state = {
            authUser: null
        };
    }

    public componentDidMount() {
        firebase.auth().onAuthStateChanged(authUser => {
            authUser
                ? this.setState(() => ({ authUser }))
                : this.setState(() => ({ authUser: null }));
        });
    }

    public render() {
        const { state } = this;
        const authContext = {
            authState: state,
        };

        return (
            <AuthContext.Provider value={authContext}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
};

export default AuthContextProvider;