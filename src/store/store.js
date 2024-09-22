import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// by default redux-toolkit uses redux-thunks as middleware in the background
// so if we want to change it use middleware: [middlewares] our own custom middlewares

const persistConfig = {
  key:'root',
  storage: storage,
  whiteList:['cart']
}

const persistedReducer = persistReducer(persistConfig,rootReducer);


const middlewares = [process.env.NODE_ENV!=='production' && logger].filter(Boolean);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});

export const persistor = persistStore(store);