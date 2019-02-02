import * as React from "react";
import { classNames } from "../../../utils/utils";
import { signOutFirebaseUser } from "../../config/firebase/auth/authentication";
import UserImage from "../UserImage/UserImage";
import { Link } from "react-router-dom";

interface IProfile {

}

interface IProfileProps {
  profile: any;
}

interface IProfileState {
  hidden: boolean;
}

class Profile extends React.Component<IProfileProps, IProfileState> {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    };
  }

  static styleClass = {
    profile: (hidden: boolean) =>
      classNames(
        "ulv__relative",
        "ulv__w-20",
        "ulv__cursor-pointer",
        "hover__ulv__bg-green-secondary-1",
        hidden ? "" : "ulv__bg-green-secondary-1"
      )
  };

  private toggleProfile = () => {
    const { hidden } = this.state;
    this.setState({
      hidden: !hidden
    });
  };

  render() {
    const { hidden } = this.state;
    const { profile } = this.props;
    return (
      <div
        className={Profile.styleClass.profile(hidden)}
        onClick={() => this.toggleProfile()}
      >
        <UserImage />
        {hidden ? null : (
          <div
            className={
              "ulv__absolute ulv__w-80 ulv__h-48 ulv__bg-green-secondary-1"
            }
            style={{ top: "4.5rem", left: '-15rem' }}
          >
            <ul className={"ulv__list-reset ulv__m-4 ulv__text-white"}>
              <li className={"ulv__p-2"}>{profile.email}</li>
              <li className={"ulv__p-2"}>
                <Link
                  to={"/"}
                  className={"ulv__text-white"}
                  onClick={() => signOutFirebaseUser()}
                >
                  Logg ut
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
