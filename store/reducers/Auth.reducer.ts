import { AnyAction } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthAction } from '../actions/Auth.action';

export namespace AuthReducer {
  export interface State {
    cookies: string;
    userId: string;
  }

  const initialState: State = {
    cookies: '',
    userId: '',
  };

  export const authReducer = (
    state = initialState,
    action: AnyAction,
  ): State => {
    switch (action.type) {
      case AuthAction.Type.SET_USER_ID:
        return { ...state, userId: String(action.payload) };
      case AuthAction.Type.SET_COOKIES:
        return { ...state, cookies: String(action.payload) };
      default:
        return state;
    }
  };
}
