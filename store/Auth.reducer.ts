import { AnyAction } from "redux";
import { ActionType } from "./App.store";
import { AuthAction } from "./Auth.action";

export namespace AuthReducer {
    export interface State {
        cookies: string
    }

    const initialState: State = {
        cookies: ''
    }

    // todo: i think this needs to be a union or something
    export type Action = ActionType<string>;

    export const authReducer = (state = initialState, action: AnyAction): State => {
        switch (action.type) {
            case AuthAction.Type.SET_COOKIES:
                return { ...state, cookies: String(action.payload) };
            default:
                return state;
        }
    }

}

