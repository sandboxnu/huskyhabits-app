
export namespace AuthAction {
    export enum Type {
        SET_COOKIES = 'SET_COOKIES'
    }

    interface SetCookies {
        type: typeof Type.SET_COOKIES,
        payload: string
    }

    export const setCookies = (payload: string): SetCookies => ({
        type: Type.SET_COOKIES,
        payload
    });

}
