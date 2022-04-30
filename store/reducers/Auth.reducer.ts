import { AnyAction } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthAction } from '../actions/Auth.action';

export namespace AuthReducer {
  export interface State {
    cookies: string;
  }

  const initialState: State = {
    cookies: '',
  };

  export const authReducer = (
    state = initialState,
    action: AnyAction,
  ): State => {
    switch (action.type) {
      case AuthAction.Type.SET_COOKIES:
        return { ...state, cookies: String(action.payload) };
      default:
        return state;
    }
  };
}
