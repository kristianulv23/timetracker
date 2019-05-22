import * as React from "react";
import { classNames } from "../../../utils/utils";
import MenuList from "./MenuList";
import { HamburgerButton } from '../shared/Button/HamburgerButton/HamburgerButton';
import { IWithMenuContext, withMenuContext } from "../../context/withMenuContext";

const listItems = [
    {
        title: 'Arkiv',
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
            'ulv__z-20',
            'ulv__bg-green-secondary-1',
            'ulv__h-full',
            'ulv__w-full',
            'md__ulv__w-64',
            active ? 'openMenu' : 'closeMenu'
        ),
        listWrapper: classNames(
            'ulv__absolute',
            'ulv__w-full'
        ),
    }

    render() {
        const { toggleMenu, menuState } = this.props;
        return (
            <div className={Menu.styleClass.root(menuState.active)}>
                <HamburgerButton toggleMenu={toggleMenu} active={menuState.active} />
                <div className={Menu.styleClass.listWrapper} style={{ top: '8rem' }}>
                    {listItems.map((item, index) => {
                        return <MenuList key={index} {...item} />
                    })}
                </div>
            </div>
        );
    }
}

export default withMenuContext(Menu);