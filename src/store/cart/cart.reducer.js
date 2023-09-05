import {CASE_ACTION_TYPES} from './cart.types';

const InitialState = {
    isCartOpen : false,
    cartItems : [],
}

export const cartReducer = (state=InitialState, action={}) => {

    
    const {type, payload} = action;
    console.log('In cart Re',payload);
    switch(type) {
        case CASE_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ... state,
                cartItems:payload
            }
        case CASE_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen:payload
            }
            default:
            return state;      
        }
}