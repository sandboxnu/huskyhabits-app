import { RootState } from "./App.store";

export const selectAuthenticated = (state: RootState): boolean => state.auth.authenticated;
