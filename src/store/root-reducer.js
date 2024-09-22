import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';
import { cartReducer } from './cart/cart.reducer';
import darkModeReducer from './DarkMode/darkMode';
import loaderReducer from './Loader/loader';

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  darkModeReducer: darkModeReducer,
  loaderReducer: loaderReducer
});
