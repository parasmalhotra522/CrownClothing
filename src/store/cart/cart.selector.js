import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector([selectCartReducer],
     (cart)=>{
    return cart.cartItems;
});

export const selectIsCartOpen = createSelector([selectCartReducer],
    (cart) => {
        console.log("Check in selector is open", cart);
        return (cart.isCartOpen);
    });

export const selectCartCount = createSelector([selectCartItems],
     (cartItems) => {
        return cartItems.reduce((total, cartItem)=>total+cartItem.quantity,0);
})

export const selectCartTotal = createSelector([selectCartItems], (cartItems) => {
    return cartItems.reduce((total, cartItem)=>total+cartItem.quantity * cartItem.price,0);
});

// const newCartCount = 
// .reduce((total,currentCartItem) => 
//         total+currentCartItem.quantity,0);
        