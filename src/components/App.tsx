import * as React from "react";
import Routers from '../routes/Route';
import { classNames } from "../../utils/utils";
import Body from "../components/Body/Body";
import { Switch } from 'react-router'
import MenuContextProvider from '../context/MenuContext';
import ModalContextProvider from '../context/ModalContext';
import AuthContextProvider from '../context/AuthContext';
import LoaderContextProvider from '../context/LoaderContext';
import Header from '../components/Header/Header';
import Menu from '../components/Menu/Menu';
import { init as initializeFirebase } from '../firebase/firebase';

export class App extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false
        }
        initializeFirebase();
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
                    <LoaderContextProvider>
                        <MenuContextProvider>
                            <ModalContextProvider>
                                <Menu />
                                <Header />
                                <Body>
                                    <Switch>
                                        <Routers />
                                    </Switch>
                                </Body>
                            </ModalContextProvider>
                        </MenuContextProvider>
                    </LoaderContextProvider>
                </AuthContextProvider>
            </div>
        );
    }
}