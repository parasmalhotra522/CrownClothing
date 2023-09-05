// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";
// export const getCategoriesMap = async() => {
//         const categoryMap = await getCategoriesAndDocuments();
//         // console.log('cccc', categoryMap);
//         return categoryMap;
// }
import {CATEGORY_ACTION_TYPES} from './categories.types';

const setCategoriesMap = (categories) => {
    // console.log("Data received in  action", categories);
    return ({type:CATEGORY_ACTION_TYPES.SET_CATEGORY,
        payload:categories});
}
export default setCategoriesMap;
