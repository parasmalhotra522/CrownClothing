export const selectCurrentUser = (state) => {
    console.log('checking the user ',state);
    return state.user.selectCurrentuser;
}