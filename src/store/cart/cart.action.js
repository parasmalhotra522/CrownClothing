import {CASE_ACTION_TYPES} from './cart.types';

export const isCartOpen = (boolean) => {
    return { type:CASE_ACTION_TYPES.SET_IS_CART_OPEN, 
        payload: boolean };
}

const addCartItem = (cartItems, productToAdd) => {
    // find if the cartItems already contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    // if found increment quantity by 1

    if (existingCartItem) {
        return(cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        ))
    }


    // returns new array with modified new items
    return [...cartItems, {...productToAdd, quantity:1}];
}


// remove element completely from the cart
const removeFullItemFromCart = (cartItems, itemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id===itemToRemove.id);
    if (existingCartItem) {
        return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id )
    }
}


// remove element from the cart
const removeItemFromCart = (cartItems, itemToRemove) => {
    console.log("All cart Items, ", cartItems, "to remove", itemToRemove);
    // check if the item exists in the cart
    const existingCartItem = cartItems.find(cartItem => cartItem.id===itemToRemove.id);
    if (existingCartItem) {

        if (existingCartItem.quantity === 1) {
            return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id )
        }

        return cartItems.map((cartItem) => {
            return (cartItem.id === itemToRemove.id 
            ?
            {...cartItem, quantity: cartItem.quantity-1}
            
            : cartItem
            )
        })
        
    }
}
    

export const addItemToCart = (cartItems,productToAdd) => {
    const newCartItems = addCartItem(cartItems,productToAdd);
    return {type: CASE_ACTION_TYPES.SET_CART_ITEMS, payload:newCartItems};
   
}

export const removeItem = (cartItems, itemToRemove) => {
    // console.log(" I am in the remove meeeethod", itemToRemove);
    const newCartItems = removeItemFromCart(cartItems, itemToRemove);
    return {type: CASE_ACTION_TYPES.SET_CART_ITEMS,payload:newCartItems};

}

export const removeFullItem = (cartItems,itemToRemove) => {
    // console.log("OI am completely removing the item from cart");
    const newCartItems = removeFullItemFromCart(cartItems, itemToRemove);
    return {type: CASE_ACTION_TYPES.SET_CART_ITEMS, payload:newCartItems};
   
}

export const setIsCartOpen = (bool) => {
    return ({type:CASE_ACTION_TYPES.SET_IS_CART_OPEN, payload:bool});
}
export const setCartTotal = (price) => {
    return ({type:CASE_ACTION_TYPES.SET_CART_TOTAL, payload:price});
}