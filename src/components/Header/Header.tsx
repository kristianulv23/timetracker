import * as React from "react";
import { classNames } from "../../../utils/utils";
import {
  IWithAuthContext,
  withAuthContext
} from "../../context/withAuthContext";
import Profile from "../profile/Profile";

interface IHeaderProps extends IWithAuthContext {
  authState: any;
  modalState: any;
}

class Header extends React.Component<IHeaderProps, {}> {
  constructor(props) {
    super(props);
    this.state = {};
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
    )
  };

  render() {
    const { authState } = this.props;
    return (
      <nav className={Header.styleClass.nav}>
        {authState.authUser ? <Profile profile={authState.authUser} /> : null}
      </nav>
    );
  }
}

export default withAuthContext(Header);
