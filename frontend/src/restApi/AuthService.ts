import $api, {API_URL} from "./api";
import axios, {AxiosResponse} from "axios";
import {AuthResponseData} from "../models/AuthModels/AuthResponseData";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponseData>> {
        return $api.post<AuthResponseData>("/login", {email, password})
    }
    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponseData>> {
        return $api.post<AuthResponseData>("/registration", {email, password})
    }
    static async logout(): Promise<AxiosResponse<AuthResponseData>> {
        return $api.post<AuthResponseData>("/logout")
    }
    static async refresh(): Promise<AxiosResponse<AuthResponseData>> {
        return axios.get(`${API_URL}/refresh`, {withCredentials: true})
    }

}