import * as React from 'react';
import { Subtract } from 'utility-types';
import { IFirebaseState, FirebaseConsumer, IFirebaseContext } from "./FirebaseContext";


export interface IWithFirebaseContext {
    state: IFirebaseState;
    toggleFirebase: () => void;
}

export const withFirebaseContext = <P extends IWithFirebaseContext>(Component: React.ComponentType<P>) =>
    class WithFirebaseContext extends React.PureComponent<Subtract<P, IWithFirebaseContext>> {
        public render() {
            return (
                <FirebaseConsumer>
                    {
                        (firebaseContext: IFirebaseContext) => <Component
                            {...this.props}
                            {...firebaseContext}
                        />
                    }
                </FirebaseConsumer>
            );
        }
    };
