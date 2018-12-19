import * as React from "react";
import { classNames } from "../../../utils/utils";
import { Link } from "react-router-dom";

export interface IMenuProps {
    title: string;
    path: string;
}

export class MenuList extends React.Component<IMenuProps, {}> {

    static styleClass = {
        root: classNames(
            'ulv__flex',
            'ulv__cursor-pointer',
            'hover__ulv__bg-green-secondary',
            'ulv__bg-green-primary',
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
        const { title, path } = this.props;
        return (
            <Link to={path}>
                <div className={MenuList.styleClass.root}>
                    <span className={MenuList.styleClass.title}>{title}</span>
                </div>
            </Link>
        );
    }
}