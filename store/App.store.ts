import { configureStore, ThunkAction, AnyAction } from '@reduxjs/toolkit';
import { AuthReducer } from './reducers/Auth.reducer';

export const store = configureStore({
  reducer: {
    auth: AuthReducer.authReducer,
  },
});

// Infer Rootstate and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { auth: AuthState }
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
