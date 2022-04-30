export namespace ProfileAction {
  export enum Type {
    GET_PROFILE = 'GET_PROFILE',
    SET_PROFILE = 'SET_PROFILE',
  }

  interface GetProfile {
    type: typeof Type.GET_PROFILE;
  }

  interface SetProfile {
    type: typeof Type.SET_PROFILE;
    payload: object;
  }

  export const getProfile = (): GetProfile => ({
    type: Type.GET_PROFILE,
  });

  export const setProfile = (payload: object): SetProfile => ({
    type: Type.SET_PROFILE,
    payload,
  });
}
