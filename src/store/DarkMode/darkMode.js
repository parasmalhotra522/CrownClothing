import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isDarkMode : false,
    backgroundColor: '#fff',
    textColor:''
} 

const darkModeSlice = createSlice({

    name:'DarkMode',
    initialState,
    reducers : {
        turnOnDarkMode : (state) => {
            state.isDarkMode = true;
            state.backgroundColor='#333';
            state.textColor='#fff';
        } ,
        turnOffDarkMode : (state) => {
            state.isDarkMode = false;
            state.backgroundColor='#fff';
            state.textColor='';
        } ,
    }

});

export const {turnOnDarkMode, turnOffDarkMode} = darkModeSlice.actions;
export default darkModeSlice.reducer;

