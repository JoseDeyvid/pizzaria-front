import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthContext } from "../contexts/AuthContext";
import { AuthTokenError } from "./errors/AuthTokenError";
import { useContext } from "react";
import { signOut } from "../contexts/AuthContext";

export const setupAPIClient = () => {
    const cookies = parseCookies()

    const api = axios.create({
        // baseURL: "https://pizzariaback.vercel.app",
        baseURL: "http://localhost:5000",
        headers: {
            Authorization: `Bearer ${cookies["auth_token"]}`
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (typeof window !== undefined) {
                signOut();
            } else {
                return Promise.reject(new AuthTokenError())
            }
        }
        return Promise.reject(error)
    })
    return api
}