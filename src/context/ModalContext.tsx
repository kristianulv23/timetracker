import * as React from 'react';
import { Component, createContext } from 'react';

export interface IModalState {
    active: boolean;
}

export interface IModalContext {
    modalState: IModalState;
    updateModalState: () => void;
}

const ModalContext = createContext<IModalContext>(null);

export const ModalConsumer = ModalContext.Consumer;

class ModalContextProvider extends Component<any, IModalState> {

    constructor(props: any) {
        super(props);

        this.state = {
            active: false
        };
    }

    private updateModalState = () => {
        const {active} = this.state;
        this.setState({
            active: !active
        })
    };

    public render() {
        const { state } = this;
        const modalContext = {
            modalState: state,
            updateModalState: this.updateModalState
        };

        return (
            <ModalContext.Provider value={modalContext}>
                {this.props.children}
            </ModalContext.Provider>
        );
    }
}

export default ModalContextProvider;
