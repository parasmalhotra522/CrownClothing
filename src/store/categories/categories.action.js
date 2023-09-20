// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";
// export const getCategoriesMap = async() => {
//         const categoryMap = await getCategoriesAndDocuments();
//         // console.log('cccc', categoryMap);
//         return categoryMap;
// }

import {CATEGORY_ACTION_TYPES} from './categories.types';

// const setCategoriesMap = (categories) => {
//     // console.log("Data received in  action", categories);
//     return ({type:CATEGORY_ACTION_TYPES.SET_CATEGORY,
//         payload:categories});
// }

export const fetchCategoriesStart = () => ({ type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START});
export const fetchCategoriesSuccess = (categoriesArray) => ({ type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, payload:categoriesArray})
export const fetchCategoriesFailed = (error) => ({ type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, payload:error});

// code for using redux-thunk
// we will perform the api call from action.js rather than the component and dispatch it from here 
// const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch(fetchCategoriesStart());
//     try {
//        const categoriesArray =  await getCategoriesAndDocuments('categories');
//         dispatch(fetchCategoriesSuccess(categoriesArray));

//     } catch(error) {
//         dispatch(fetchCategoriesFailed(error));
//     }
// // }
// export default fetchCategoriesAsync;

