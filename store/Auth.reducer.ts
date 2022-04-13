import { AnyAction } from "redux";
import { ActionType } from "./App.store";
import { AuthAction } from "./Auth.action";

export namespace AuthReducer {
    export interface State {
        authenticated: boolean
    }

    const initialState: State = {
        authenticated: false
    }

    // todo: i think this needs to be a union or something
    export type Action = ActionType<boolean>;

    export const authReducer = (state = initialState, action: AnyAction): State => {
        switch (action.type) {
            case AuthAction.Type.SET_AUTHENTICATED:
                return { ...state, authenticated: Boolean(action.payload) };
            default:
                return state;
        }
    }

}

