import { fetchCategoriesSuccess, fetchCategoriesFailed } from './categories.action';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import {CATEGORY_ACTION_TYPES} from './categories.types';
import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.util';


export function* fetchCategoriesAsync() {
    try {
        // call(functionanme, argument_tobe passed to function)
        // whenver we need to call a function use this kind of approach
        const categoriesArray =   yield call(getCategoriesAndDocuments, 'categories');
      
        
        // we don't use dispatch in the saga.. we use put instead
        yield put(fetchCategoriesSuccess(categoriesArray));
 
     } catch(error) {
        yield put(fetchCategoriesFailed(error));
     }
}   

export function* onFetchCategories() {
    yield takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
    // all([]) takes set of the generator functions to be called 
    yield all([call(onFetchCategories)]);
}


