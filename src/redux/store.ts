import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './features/countrySlice';
import authReducer from './features/authSlice';

export const store = configureStore({
    reducer: {
        countryReducer,
        authReducer
    },
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;