import * as React from 'react';
import { classNames } from '../../../utils/utils';
import { signOutFirebaseUser } from '../../config/firebase/auth/authentication';
import UserImage from '../UserImage/UserImage';
import { Link } from 'react-router-dom';

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
        'ulv__relative',
        'ulv__w-20',
        'hover__ulv__bg-green-secondary-1',
        hidden ? '' : 'ulv__bg-green-secondary-1'
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
              'ulv__absolute ulv__w-80 ulv__h-48 ulv__bg-green-secondary-1'
            }
            style={{ top: '4.5rem', left: '-15rem' }}
          >
            <ul className={'ulv__list-reset ulv__text-white'}>
              <li className={'ulv__m-4'}>{profile.email}</li>
              <Link 
                className={'ulv__text-white ulv__cursor-pointer'}
                onClick={() => signOutFirebaseUser()}
                to={'/'}>
              <li className={'ulv__p-6 hover__ulv__bg-green-secondary'}>
                  Logg ut
              </li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
