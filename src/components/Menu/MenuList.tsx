import * as React from "react";
import { classNames } from "../../../utils/utils";
import { Link } from "react-router-dom";
import {IWithMenuContext, withMenuContext} from '../../context/withMenuContext';

export interface IMenuProps extends IWithMenuContext {
    title: string;
    path: string;
}

class MenuList extends React.Component<IMenuProps, {}> {

    static styleClass = {
        root: classNames(
            'ulv__flex',
            'ulv__cursor-pointer',
            'hover__ulv__bg-green-secondary',
            'ulv__h-12',
            'ulv__w-full',
            'ulv__items-center'
        ),
        title: classNames(
            'ulv__text-white',
            'ulv__ml-16'
        )
    }

    render() {
        const { title, path, toggleMenu } = this.props;
        return (
            <Link to={path} onClick={() => toggleMenu()}>
                <div className={MenuList.styleClass.root}>
                    <span className={MenuList.styleClass.title}>{title}</span>
                </div>
            </Link>
        );
    }
}

export default withMenuContext(MenuList);