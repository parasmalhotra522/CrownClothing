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

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const loggedInUser = useSelector(selectCurrentUser); 
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
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
