import * as React from "react";
import Routers from '../router/router';
import { classNames } from "../../utils/utils";
import Body from "../components/Body/Body";
import MenuContextProvider from '../context/MenuContext';
import ModalContextProvider from '../context/ModalContext';
import AuthContextProvider from '../context/AuthContext';
import Header from '../components/Header/Header';
import Menu from '../components/Menu/Menu';

import { init as firebaseInit } from '../config/firebase/firebase';

export class App extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false
        }
        firebaseInit();
    }

    static styleClass = {
        root: classNames(
            'ulv__h-full',
            'ulv__w-full'
        )
    }

    render() {
        return (
            <div className={App.styleClass.root}>
                <AuthContextProvider>
                    <MenuContextProvider>
                        <ModalContextProvider>
                            <Menu />
                            <Header />
                            <Body>
                                <Routers />
                            </Body>
                        </ModalContextProvider>
                    </MenuContextProvider>
                </AuthContextProvider>
            </div>
        );
    }
}