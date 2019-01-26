import * as React from 'react';
import { Component, createContext } from 'react';

export interface IMenuState {
    active: boolean;
}

export interface IMenuContext {
    menuState: IMenuState;
    toggleMenu: () => void;
}

const MenuContext = createContext<IMenuContext>(null);

export const MenuConsumer = MenuContext.Consumer;

class MenuContextProvider extends Component<any, IMenuState> {

    constructor(props: any) {
        super(props);

        this.state = {
            active: false
        };
    }

    private toggleMenu = () => {
        const { active } = this.state;
        this.setState({
            active: !active
        })
    };

    public render() {
        const { state } = this;
        const menuContext = {
            menuState: state,
            toggleMenu: this.toggleMenu
        };

        return (
            <MenuContext.Provider value={menuContext}>
                {this.props.children}
            </MenuContext.Provider>
        );
    }
}

export default MenuContextProvider;
