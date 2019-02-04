import * as React from "react";
import { classNames } from "../../../../../utils/utils";
import { Link } from "react-router-dom";

export interface IDefaultButtonProps {
  type?: string;
  text: string;
  className?: string;
  onClick?: () => any;
  disabled?: boolean;
  link?: boolean;
  linkTo?: string;
}

export class DefaultButton extends React.Component<IDefaultButtonProps, {}> {

  public static defaultProps = {
    link: false
  };

  static styleClass = {
    button: (className: string) =>
      classNames("ulv__text-white", "ulv__p-2", className)
  };

  render() {
    const { text, onClick, className, disabled, type, link, linkTo } = this.props;
    return (
      link ?
        <Link to={linkTo} className={DefaultButton.styleClass.button(className)}>{text}</Link>
        :
        <button
          onClick={onClick ? () => onClick() : null}
          className={DefaultButton.styleClass.button(className)}
          type={type}
          disabled={disabled}
        >
          {text}
        </button>
    );
  }
}
