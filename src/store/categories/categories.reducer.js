import { CATEGORY_ACTION_TYPES } from './categories.types';

const INITIAL_STATE =  {
    categories : [],
}

export const categoriesReducer = (state=INITIAL_STATE, action={}) => {
    
    // console.log("i am in reducer", action);   
    const {type, payload} = action;

    switch(type) {
        case CATEGORY_ACTION_TYPES.SET_CATEGORY :
            return {
                ...state,
                categories:payload
            }
        default:
            return state;
    }
}