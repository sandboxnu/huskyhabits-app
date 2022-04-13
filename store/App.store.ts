import { configureStore } from '@reduxjs/toolkit'
import { AuthReducer } from './Auth.reducer';

export const store = configureStore({
    reducer: {
        auth: AuthReducer.authReducer
    },
});

// this also might need to be changed
export interface ActionType<T> {
    type: string,
    payload: T
}

// infer Rootstate and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
