import * as React from 'react';
import { Subtract } from 'utility-types';
import { IMenuState, MenuConsumer, IMenuContext } from "./MenuContext";


export interface IWithMenuContext {
    menuState: IMenuState;
    toggleMenu: () => void;
}

export const withMenuContext = <P extends IWithMenuContext>(Component: React.ComponentType<P>) =>
    class WithMenuContext extends React.PureComponent<Subtract<P, IWithMenuContext>> {
        public render() {
            return (
                <MenuConsumer>
                    {
                        (menuContext: IMenuContext) => <Component
                            {...this.props}
                            {...menuContext}
                        />
                    }
                </MenuConsumer>
            );
        }
    };
