
export namespace AuthAction {
    export enum Type {
        SET_AUTHENTICATED = 'SET_AUTHENTICATED'
    }

    interface SetAuthenticated {
        type: typeof Type.SET_AUTHENTICATED,
        payload: boolean
    }

    export const setAuthenticated = (payload: boolean): SetAuthenticated => ({
        type: Type.SET_AUTHENTICATED,
        payload
    });

}
