import { useDispatch, useSelector } from 'react-redux';

import {
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
} from '../../store/cart/cart.reducer';

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.styles';
import { toast } from 'react-toastify';
import { startLoading, stopLoading } from '../../store/Loader/loader';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();

  const notify = (type, msg) => {
    switch (type) {
      case 'success':
        toast.success(msg);
        break;
      case 'error':
           toast.error(msg);
        break;
      case 'warn':
        toast.warn(msg);
        break;
      default:
        break;
    }
  }

  const clearItemHandler = async () => {
    dispatch(startLoading())
    try {
      await dispatch(clearItemFromCart(cartItem));
      notify('success', "Success: Item removed from Cart")
    } catch (error) {
      notify('error', "Error: Could not remove item from Cart")
     } finally {
      dispatch(stopLoading());
    }
  
  }
 
  const addItemHandler = () => dispatch(addItemToCart(cartItem));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
