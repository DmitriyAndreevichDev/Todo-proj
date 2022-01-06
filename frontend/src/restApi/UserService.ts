import $api from "./api";
import {AxiosResponse} from "axios";
import {AuthResponseData} from "../models/AuthModels/AuthResponseData";
import IUser from "../models/IUser";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>("/users")
    }
}