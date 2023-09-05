import "./cart-dropdown.styles.jsx";
import { useNavigate } from 'react-router-dom';
import CartItem from "../cart-item/cart-item.component";
import { CartDropDownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx';
import { useSelector } from "react-redux";
import {selectCartItems} from '../../store/cart/cart.selector.js';

const CartDropDown = () => {
    const cartItems = useSelector(selectCartItems);


    console.log("Cart dropdwn", cartItems);

    const navigate = useNavigate();

    const navigateToCheckout = () => {
        navigate('/checkout');
    }
    
    return (
        <CartDropDownContainer>
            <CartItems>
                { cartItems?.length ? 
                (cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item}></CartItem>)
                  
                
                )) : 
                (<EmptyMessage>No items in the cart</EmptyMessage>)

                    
            }
                <button onClick={navigateToCheckout} >Go to Checkout</button>
            </CartItems>
        </CartDropDownContainer>
    );
}

export default CartDropDown;