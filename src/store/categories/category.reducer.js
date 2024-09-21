import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  categories: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState:INITIAL_STATE,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    }
  },
});
export const {setCategories} = categorySlice.actions;
export const categoriesReducer = categorySlice.reducer;



