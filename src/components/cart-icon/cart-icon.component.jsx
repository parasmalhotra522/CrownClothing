import {CartIconContainer, ItemCount, ShoppingIcon} from "./cart-icon.styles.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsCartOpen , selectCartCount} from "../../store/cart/cart.selector";
import {setIsCartOpen} from  '../../store/cart/cart.action.js';
// import { ReactComponent as ShoppingBag } from '../../assets/images/shopping-bag.svg';

const CartIcon = () => {
    // const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);
    
    const toggle = () => dispatch(setIsCartOpen(!isCartOpen)); 
    
    const currentCartCount = cartCount;
    
    // console.log("In icon page", cartItems);

    // const totalCartItems = cartItems.reduce((accumulator, cartItem)=>accumulator += cartItem.quantity,0);
    // console.log("Total elements in cart", totalCartItems);
    return (
        <CartIconContainer>
            <ShoppingIcon onClick={toggle}/>
            <ItemCount>{currentCartCount}</ItemCount>

        </CartIconContainer>
    );
}

export default CartIcon;