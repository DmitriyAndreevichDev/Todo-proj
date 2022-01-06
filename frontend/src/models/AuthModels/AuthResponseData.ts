import IUser from "../IUser";

export interface AuthResponseData {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}