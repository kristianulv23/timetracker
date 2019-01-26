import * as React from "react";
import { classNames } from "../../../../../utils/utils";

export interface IDefaultButtonProps {
    type?: string;
    text: string;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export class DefaultButton extends React.Component<IDefaultButtonProps, {}> {

    static styleClass = {
        button: (className: string) => classNames(
            'ulv__text-white',
            'ulv__p-2',
            'ulv__w-24',
            className
        )
    }

    render() {
        const { text, onClick, className, disabled, type } = this.props;
        return (
            <button onClick={onClick ? () => onClick() : null} className={DefaultButton.styleClass.button(className)} type={type} disabled={disabled}>{text}</button>
        );
    }
}