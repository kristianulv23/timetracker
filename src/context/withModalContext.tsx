import * as React from 'react';
import { Subtract } from 'utility-types';
import { IModalState, ModalConsumer, IModalContext } from "./ModalContext";


export interface IWithModalContext {
    modalState: IModalState;
    updateModalState: () => void;
    toggleModal: () => void;
}

export const withModalContext = <P extends IWithModalContext>(Component: React.ComponentType<any>) =>
    class WithModalContext extends React.PureComponent<Subtract<any, IWithModalContext>> {
        public render() {
            return (
                <ModalConsumer>
                    {
                        (modalContext: IModalContext) => <Component
                            {...this.props}
                            {...modalContext}
                        />
                    }
                </ModalConsumer>
            );
        }
    };
