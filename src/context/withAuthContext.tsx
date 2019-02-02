import * as React from 'react';
import { Subtract } from 'utility-types';
import { IAuthState, AuthConsumer, IAuthContext } from "./AuthContext";


export interface IWithAuthContext {
    authState: IAuthState;
}

export const withAuthContext = <P extends IWithAuthContext>(Component: React.ComponentType<any>) =>
    class WithAuthContext extends React.PureComponent<Subtract<any, IWithAuthContext>> {
        public render() {
            return (
                <AuthConsumer>
                    {
                        (AuthContext: IAuthContext) => <Component
                            {...this.props}
                            {...AuthContext}
                        />
                    }
                </AuthConsumer>
            );
        }
    };
