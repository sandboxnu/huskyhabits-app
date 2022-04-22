import { RootState } from '../App.store';

export const selectCookies = (state: RootState): string => state.auth.cookies;
