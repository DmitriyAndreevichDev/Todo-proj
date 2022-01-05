import Store from "../../Redux/state/store";
import {login, LOGOUT, logout, registration} from "../../Redux/redusers/authReducer";
import {Dispatch} from "react";
import AuthService from "../../restApi/AuthService";
import {AxiosResponse} from "axios";
import {AuthResponseData} from "../../models/AuthModels/AuthResponseData";

export const loginUserThunk = (email: string, password: string) =>
    (dispatch: Dispatch<any>, getState: () => Store): void => {

        AuthService.login(email, password).then((res: AxiosResponse<AuthResponseData>): void => {

                localStorage.setItem("token", res.data.accessToken)

                dispatch(login(res.data))
            }
        ).catch(err => {
            console.error(err)
        })
    }

export const registrationUserThunk = (email: string, password: string) =>
    (dispatch: Dispatch<any>) => {
        AuthService.registration(email, password).then((res: AxiosResponse<AuthResponseData>): void => {

                localStorage.setItem("token", res.data.accessToken)

                dispatch(registration(res.data))
            }
        ).catch(err => {
            console.error(err)
        })
    }
export const logoutUserThunk = () =>
    (dispatch: Dispatch<any>) => {
        AuthService.logout().then((res: AxiosResponse<AuthResponseData>): void => {
                localStorage.removeItem("token")
                dispatch(logout())
            }
        ).catch(err => {
            console.error(err)
        })
    }

export const isAuthUserThunk = () =>
    (dispatch: Dispatch<any>) => {
        AuthService.refresh().then(
            (res) => {
                localStorage.setItem("token", res.data.accessToken)
                dispatch(login(res.data))
            }
        ).catch(
            (err) => {console.log(err)}
        )
    }