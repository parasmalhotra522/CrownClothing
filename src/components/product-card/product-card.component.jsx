import "./product-card.component.scss";
import {addItemToCart} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({product}) => {
    // console.log('I am in ',product);    
    const dispatch = useDispatch();
    const {name, imageUrl, price} = product;
    const cartItems = useSelector(selectCartItems);

    // const {addItemToCart} = useContext(CartContext);
    // const check = selectCart(product);
    // console.log("Checking the state", check);
    // const addItemToCart = () => addCartItem([],product);
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={name}/>
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <button type="button" className="add-to-cart"
                onClick = {addProductToCart}
            >Add to cart</button>
        </div>
    );
}


export default ProductCard;