import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import {
  UserContext,
} from '../../contexts/user.context';

import {
  signOutUser,
} from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

const Navigation = () => {
  const {
    currentUser,
    setCurrentUser,
  } = useContext(UserContext);

  // create an handler to signOut and update the Context
  const signOutHandler = async () => {
    await signOutUser();
    // set the context to null
    setCurrentUser(null);
  }
  return (
    <>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrownLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {
            currentUser ? (
              <span
                onClick={signOutHandler}
                className='nav-link'
              >
                SIGN OUT
              </span>
            ) : (
              <Link className='nav-link' to='/auth'>
                SIGN IN
              </Link>
            )
          }
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navigation;
