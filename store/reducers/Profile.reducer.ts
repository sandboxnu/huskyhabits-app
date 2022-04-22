import { AnyAction } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthAction } from '../actions/Auth.action';
import { ProfileAction } from '../actions/Profile.action';

export namespace ProfileReducer {
  interface State {
    username: string;
    name: string;
    bio?: string;
    photoBuffer?: Buffer | null;
    photoURI?: string;
  }

  const initialState: State = {
    username: '',
    name: '',
    bio: '',
    photoBuffer: null,
    photoURI: '',
  };

  export const profileReducer = (
    state = initialState,
    action: AnyAction,
  ): State => {
    switch (action.type) {
      //   case ProfileAction.Type.GET_PROFILE:
      //     return { ...state, cookies: String(action.payload) };
      //  case ProfileAction.Type.SET_PROFILE:
      //     return { ...state, payload: object(action.payload) };
      default:
        return state;
    }
  };
}
