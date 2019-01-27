import * as React from "react";
import { classNames } from "../../../utils/utils";
import { Link } from "react-router-dom";
import { signOutFirebaseUser } from "../../config/firebase/auth/authentication";
import { DefaultButton } from "../shared/Button/DefaultButton/DefaultButton";
import {
  IWithAuthContext,
  withAuthContext
} from "../../context/withAuthContext";
import {
  IWithModalContext,
  withModalContext
} from "../../context/withModalContext";

interface IHeaderProps extends IWithModalContext, IWithAuthContext {
  authState: any;
  modalState: any;
}

class Header extends React.Component<IHeaderProps, {}> {
  constructor(props) {
    super(props);
  }

  static styleClass = {
    nav: classNames(
      "ulv__fixed",
      "ulv__z-10",
      "ulv__flex",
      "ulv__justify-end",
      "ulv__w-full",
      "ulv__h-18",
      "ulv__bg-green-primary"
    ),
    button: classNames(
      "ulv__bg-green-tertiary",
      "ulv__w-48",
      "hover__ulv__bg-green-secondary"
    ),
    link: classNames("ulv__text-white", "ulv__no-underline"),
    linkWrapper: classNames("ulv__flex", "ulv__items-center", "ulv__mr-8")
  };

  render() {
    const { authState } = this.props;
    console.log(authState);
    return (
      <nav className={Header.styleClass.nav}>
        {authState.authUser ? (
          <div
            className={Header.styleClass.linkWrapper}
            onClick={() => signOutFirebaseUser()}
          >
            <span className={"ulv__text-white ulv__mr-4"}>
              Logget inn som {authState.authUser.email}
            </span>
            <Link className={Header.styleClass.link} to="/">
              <DefaultButton
                text={"Logg ut"}
                className={Header.styleClass.button}
              />
            </Link>
          </div>
        ) : null}
      </nav>
    );
  }
}

export default withAuthContext<any>(withModalContext(Header));
