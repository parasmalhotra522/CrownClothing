import { Fragment } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { emptyCart } from '../../store/cart/cart.reducer';
import { NavLink } from 'react-router-dom';
import {
  NavigationContainer,
  NavLinks,
  LogoContainer,
} from './navigation.styles';

import { ToastContainer } from 'react-toastify';
import ToggleSwitch from './ToggleSwitch';
import { startLoading, stopLoading } from '../../store/Loader/loader';
import { toast } from 'react-toastify';
import Avatar from './Avatar'; 
import './style.css';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const onSignOut = async () => {
    dispatch(startLoading()); 

    try {
      await signOutUser(); 
      dispatch(emptyCart()); 
      dispatch(stopLoading()); 
      toast.success('Successfully signed out!');
      navigate('/'); 
    } catch (error) {
      dispatch(stopLoading()); 
      toast.error('Failed to sign out. Please try again.');
      // console.error('Sign-out error:', error);
    }
  };

  return (
    <Fragment>
      <ToastContainer
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme='light'
      />
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <ToggleSwitch />
          <NavLink
            style={{padding:'10px 15px'}}
            to='/shop'
            className={({ isActive }) => {
              return isActive ? 'active-link' : 'inactive-link';
            }}
          >
            SHOP
            </NavLink>
         

          {currentUser ? (
            <>
              <Avatar currentUser={currentUser} onSignOut={onSignOut} /> 
            </>
          ) : (
            <NavLink
                to='/auth'
                 style={{padding:'10px 15px'}}
                className={({ isActive }) => {
                return isActive ? 'active-link' : 'inactive-link';
              }}
            >
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
