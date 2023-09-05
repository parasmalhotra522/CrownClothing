import { createContext, useReducer } from "react";


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
     

export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen:()=>{},
    cartItems:[],
    addItemToCart: ()=>{},
    cartCount:0,
    removeItem: ()=>{},
    removeFullItem : () => {},
    total : 0
});

const InitialState = {
    isCartOpen : false,
    cartItems : [],
    cartCount : 0,
    total: 0
}
const CASE_ACTION_TYPES = {
    SET_CART_ITEMS : 'SET_CART_ITEMS',
    SET_IS_CART_OPEN : 'SET_IS_CART_OPEN'
}

// Reducers should be only and only responsible for updating the state,
// it shouldm't be responsible for any business logic of extracting data and all
 
const cartReducer = (state, action) => {

    const {type, payload} = action;
    switch(type) {
        case CASE_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ... state,
                ... payload
            }
        case CASE_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen:payload
            }
            default:
                throw new Error(`Unhandled type of ${type} in cartReducer`); 
    }
}


export const CartContextProvider = ({children}) => {
    
    const [{cartItems, isCartOpen, cartCount, total}, dispatch] 
    = useReducer(cartReducer, InitialState);
    

    const updateNewCartItemsReducer = (newCartItems) => {
        // calculating the newCart Count items
        const newCartCount = newCartItems.reduce((total,currentCartItem) => 
        total+currentCartItem.quantity,0);
        
        // calculating the new cart total 
        const newCartTotal = newCartItems.reduce((total, currentCartItem) => 
         total + currentCartItem.price * currentCartItem.quantity, 0);
     

        // now we have the values lets dispatch 
        dispatch({
            type:CASE_ACTION_TYPES.SET_CART_ITEMS,
            payload: {
                cartItems: newCartItems,
                total: newCartTotal,
                cartCount: newCartCount
            }
           });
        

    }
        
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems,productToAdd);
        updateNewCartItemsReducer(newCartItems);
    }

    const removeItem = (itemToRemove) => {
        // console.log(" I am in the remove meeeethod", itemToRemove);
        const newCartItems = removeItemFromCart(cartItems, itemToRemove);
        updateNewCartItemsReducer(newCartItems);
    }

    const removeFullItem = (itemToRemove) => {
        // console.log("OI am completely removing the item from cart");
        const newCartItems = removeFullItemFromCart(cartItems, itemToRemove);
        updateNewCartItemsReducer(newCartItems)
    }
  
    const setIsCartOpen = (bool) => {
        dispatch({type:'SET_IS_CART_OPEN', payload:bool});
    }

    const value = {isCartOpen,setIsCartOpen, addItemToCart, cartItems, cartCount,removeItem, removeFullItem, total};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}