import * as React from 'react';
import { Component, createContext } from 'react';

export interface ILoaderState {
    loading: boolean;
}

export interface ILoaderContext {
    loaderState: ILoaderState;
    updateLoaderState: () => void;
}

const LoaderContext = createContext<ILoaderContext>(null);

export const LoaderConsumer = LoaderContext.Consumer;

class LoaderContextProvider extends Component<any, ILoaderState> {

    constructor(props: any) {
        super(props);

        this.state = {
            loading: false
        };
    }

    private updateLoaderState = () => {
        const { loading } = this.state;
        this.setState({
            loading: !loading
        })
    };

    public render() {
        const { state } = this;
        const loaderContext = {
            loaderState: state,
            updateLoaderState: this.updateLoaderState
        };

        return (
            <LoaderContext.Provider value={loaderContext}>
                {this.props.children}
            </LoaderContext.Provider>
        );
    }
}

export default LoaderContextProvider;
