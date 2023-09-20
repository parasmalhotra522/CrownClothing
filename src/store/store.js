import { compose, legacy_createStore as createStore, applyMiddleware }  from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

// sagas replace thunks we need only 1 async redux thing, in our application

const sagaMiddleware = createSagaMiddleware();


// middlewares are the functions thay run before action hits the reducer
// we should use logger only and only in developer tools not in production environment
const middleWares = [
    sagaMiddleware,
     process.env.NODE_ENV === 'development' && logger,
     
    ]
     .filter(Boolean);


const composeEnhancer = (process.env.NODE_ENV !== 'production'
&& window && 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// if we refresh the page the content disappears to keep it persistent or stay we have persistStore available in the cart
const persistConfig = {
    key:'root',
    storage: storage,
    whitelist : ['cart']
}
// blacklist is the [] which stores the list of the objects which need not be persisted
// in our case 'user' is being stored in firebase so we don't care about the state being 
// persisted into the web browser's local storage

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);


