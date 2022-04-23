export namespace AuthAction {
  export enum Type {
    SET_USER_ID = 'SET_USER_ID',
    SET_COOKIES = 'SET_COOKIES',
  }

  interface SetCookies {
    type: typeof Type.SET_COOKIES;
    payload: string;
  }

  interface SetUserId {
    type: typeof Type.SET_USER_ID;
    payload: string;
  }

  export const setCookies = (payload: string): SetCookies => ({
    type: Type.SET_COOKIES,
    payload,
  });

  export const setUserId = (payload: string): SetUserId => ({
    type: Type.SET_USER_ID,
    payload,
  });
}
