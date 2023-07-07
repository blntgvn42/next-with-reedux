import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    auth: boolean;
};

const initialState = {
    auth: false,
} as AuthState;

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: () => initialState,
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.auth = action.payload;
        },
    },
});

export const {
    reset,
    setAuth,
} = auth.actions;

export default auth.reducer;
