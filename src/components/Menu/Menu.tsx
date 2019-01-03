import * as React from "react";
import { classNames } from "../../../utils/utils";
import { MenuList } from "./MenuList";
import { HamburgerButton } from '../shared/Button/HamburgerButton/HamburgerButton';
import { IWithMenuContext, withMenuContext } from "../../context/withMenuContext";

const listItems = [
    {
        title: 'Hjem',
        path: '/'
    },
    {
        title: 'Oppgaver',
        path: '/oppgaver'
    }
]

export interface IMenuProps extends IWithMenuContext {

}

class Menu extends React.Component<IMenuProps, {}> {

    constructor(props) {
        super(props);
    }

    static styleClass = {
        root: (active: boolean) => classNames(
            'ulv__fixed',
            'ulv__z-10',
            'ulv__bg-green-primary',
            'ulv__h-full',
            'ulv__w-64',
            'ulv__ml-64',
            active ? 'openMenu' : 'closeMenu'
        ),
        list_wrapper: classNames(
            'ulv__absolute',
            'ulv__w-full'
        ),
    }

    render() {
        const { toggleMenu, state } = this.props;
        return (
            <div className={Menu.styleClass.root(state.active)}>
                <HamburgerButton toggleMenu={toggleMenu} active={state.active} />
                <div className={Menu.styleClass.list_wrapper} style={{ top: '8rem' }}>
                    {listItems.map((item, index) => {
                        return <MenuList key={index} {...item} />
                    })}
                </div>
            </div>
        );
    }

    componentDidMount() {
        
    }
}

export default withMenuContext(Menu);