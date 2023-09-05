import { compose, legacy_createStore as createStore, applyMiddleware }  from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

// middlewares are the functions thay run before action hits the reducer
const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);



