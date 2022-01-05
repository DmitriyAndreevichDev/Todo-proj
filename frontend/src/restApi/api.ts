import axios from "axios";
import AuthService from "./AuthService";

export const API_URL = "http://localhost:5000/api"

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

$api.interceptors.request.use((config) => {
    if (!config.headers) return
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})

$api.interceptors.response.use(
    (config) => config,
    (err) => {
        const originalRequest = err.config
        if (err.response.status == 401 && err.config && !err.config._isRetry) {
            originalRequest._isRetry = true
            AuthService.refresh()
                .then(res => {
                    localStorage.setItem("token", res.data.accessToken)
                })
                .catch(err => console.error("Ошибка interceptors response"))
            return $api.request(originalRequest)
        }
        throw err
    }
)

export default $api