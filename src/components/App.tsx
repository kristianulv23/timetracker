import * as React from "react";
import { classNames } from "../../utils/utils";
import Body from "../components/Body/Body";
import MenuContextProvider from '../context/MenuContext';
import ModalContextProvider from '../context/ModalContext';
import { Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import Table from '../components/Table/Table';
import Modal from '../components/Modal/Modal';
import { init as firebaseInit } from '../config/firebase/firebase';

export interface IAppProps {

}

export class App extends React.Component<IAppProps, {}> {

    constructor(props) {
        super(props);
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
                <MenuContextProvider>
                    <ModalContextProvider>
                        <Body>
                            <Route path="/" component={Home} />
                            <Route path="/oppgaver" component={Table} />
                            <Route path="/create" component={Modal} />
                        </Body>
                    </ModalContextProvider>
                </MenuContextProvider>
            </div>
        );
    }
}