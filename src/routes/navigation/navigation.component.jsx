import { Outlet } from "react-router-dom";
import {NavigationContainer, LogoContainer, NavLinks, NavLink} from  "./navigation.styles.jsx";
import { Fragment } from "react";
import { useSelector } from "react-redux";
// we can import svg in React as component
import {ReactComponent as CrownLogo} from '../../assets/images/crown.svg';
import { SignOutUser } from "../../utils/firebase/firebase.util";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectCurrentUser } from "../../store/user/user.selector.js";
import { selectIsCartOpen } from "../../store/cart/cart.selector.js";


// we have concept of Fragment which are provided by React we can say they are just container which don't
// pose extra tag onto DOM when we see them in console

const Navigation = () => {
    // we use Fragment as the main div tag to be returned

    const currentUser = useSelector(selectCurrentUser);
  
    const isCartOpen = useSelector(selectIsCartOpen);

    const SignOutUserHandler = async() => {
      const res = await SignOutUser();
      // setCurrentUser(null);
      console.log(res);
    } 

   

    // console.log("Check logged in user from nav-bar", currentUser);
    return (
      <Fragment>
        
        <NavigationContainer>
        {/* Link is similar to a tag in html */}
            <LogoContainer to='/'>
               
               <CrownLogo className="logo"/>
              
            </LogoContainer>

            <NavLinks>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/shop">Shop</NavLink>
                { currentUser ? (<NavLink as='span'  onClick={SignOutUserHandler} >Sign Out</NavLink>)
                : (<NavLink to="/sign-in">Sign In</NavLink>)
                }

                <NavLink className="nav-link">
                  <CartIcon />
                </NavLink>
               {isCartOpen &&  <CartDropDown/>}
                
            </NavLinks>
            </NavigationContainer>
          <Outlet></Outlet>
    </Fragment>
    )
  }

  export default Navigation;