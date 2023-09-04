import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSignIn: false,
};

const SignInSlice = createSlice({
    name: 'signInSlice',
    initialState,
    reducers: {
        setIsSignIn: (state, action) => {
            state.isSignIn = action.payload;
        },
    },
});

export const { setIsSignIn } = SignInSlice.actions;
export default SignInSlice;
