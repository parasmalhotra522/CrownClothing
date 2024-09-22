import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles';
import { selectCurrentUser } from '../../store/user/user.selector';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.reducer';


const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const loggedInUser = useSelector(selectCurrentUser); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const goToCheckoutHandler = () => {
    dispatch(setIsCartOpen(!isCartOpen))
    
    if (!loggedInUser) {
  
      toast.error("User must be loggedIn to go to checkout")
      navigate('/');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
