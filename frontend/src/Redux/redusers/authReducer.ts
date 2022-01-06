import { handleActions, createAction} from "redux-actions";

import update from "immutability-helper"
import IUser from "../../models/IUser";
import {AuthResponseData} from "../../models/AuthModels/AuthResponseData";

export const LOGIN = "LOGIN" as const;
export const REGISTRATION = "REGISTRATION" as const;
export const LOGOUT = "LOGOUT" as const;
export const ERROR = "ERROR" as const;

export interface Auth {
    isAuth: boolean;
    accessToken: string;
    user: IUser;
    error: string;
}

export interface Error {
    message: string
}


export const login = createAction<AuthResponseData, AuthResponseData>(LOGIN, p => p)
export const registration = createAction<AuthResponseData, AuthResponseData>(LOGIN, p => p)
export const logout = createAction(LOGOUT)
export const error = createAction<Error, Error>(ERROR, p => p)


const defaultValues = {
    isAuth: false,
    accessToken: "",
    user: {
        email: "",
        isActivated: false,
        id: "",
    },
    error: "",
}

const authReducer = handleActions<Auth>({

        [LOGIN]: (state, action) => ({
            isAuth: true,
            accessToken: action.payload.accessToken,
            user: action.payload.user,
            error: "",
        }),

        [REGISTRATION]: (state, action) => ({
            isAuth: true,
            accessToken: action.payload.accessToken,
            user: action.payload.user,
            error: "",
        }),

        [LOGOUT]: () => ({
            isAuth: false,
            accessToken: "",
            user: {
                email: "",
                isActivated: false,
                id: ""
            },
            error: "",
        }),

        [ERROR]: (state, action) => ({
            isAuth: false,
            accessToken: "",
            user: {
                email: "",
                isActivated: false,
                id: ""
            },
            error: action.payload.error,
        })

    }, defaultValues
);

export default authReducer