import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {  addItemToCart } from '../../store/cart/cart.reducer';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { selectCurrentUser } from '../../store/user/user.selector';
import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from './product-card.styles';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const notify = () => toast.error("Please Login to Add Item to Cart !");
  const addProductToCart = () => {
    if (isLoggedIn) {
      dispatch(addItemToCart(product))
    }
    else {
      notify();
    }
  };
  const currentUser = useSelector(selectCurrentUser);
  
  useEffect(() => {
    // console.log("----- Checking current User", currentUser);
    if (!currentUser) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  
  }, [currentUser])
  
  return (
    <ProductCartContainer>
     
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>${price}</Price>
      </Footer>
      <Button
        // disabled = {!isLoggedIn}
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
      
    </ProductCartContainer>
  );
};

export default ProductCard;
