import { createSelector } from "reselect";


const selectCategoryReducer = (state) => {
    return state.categoriesMap;
}

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoryReuducer) => {
        // console.log("Selector 2",categoryReuducer );
        return categoryReuducer.categories 
        
    }    
);



export const selectcategoriesMap = createSelector(
    [selectCategoryReducer],
   (categories) => {
    // console.log("In selectiot",d );
 return categories.categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
 }, {});
})