import * as React from 'react';
import { Subtract } from 'utility-types';
import { ILoaderState, LoaderConsumer, ILoaderContext } from "./LoaderContext";


export interface IWithLoaderContext {
    loaderState: ILoaderState;
    updateLoaderState: () => void;
}

export const withLoaderContext = <P extends IWithLoaderContext>(Component: React.ComponentType<any>) =>
    class WithLoaderContext extends React.PureComponent<Subtract<any, IWithLoaderContext>> {
        public render() {
            return (
                <LoaderConsumer>
                    {
                        (loaderContext: ILoaderContext) => <Component
                            {...this.props}
                            {...loaderContext}
                        />
                    }
                </LoaderConsumer>
            );
        }
    };
