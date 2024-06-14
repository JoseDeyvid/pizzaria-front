import { ReactNode, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import Router from "next/router";
import { api } from "@/services/apiClient";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ContextProps } from "@/utils/types";

type AuthContextValues = {
    signIn: (credentials: SignInProps) => Promise<void>,
    signOut: () => void
}

type SignInProps = {
    email: string,
    password: string
}

export const signOut = () => {

    try {
        destroyCookie(undefined, "auth_token")
        Router.push("/")
    } catch (error) {
        console.log("Erro ao deslogar!")
    }
}

export const AuthContext = createContext({} as AuthContextValues)

export const AuthProvider = ({ children }: ContextProps) => {

    useEffect(() => {
        const { 'auth_token': token } = parseCookies();
        if (token) {
            api.get("/")
                .then((res) => {
                    const { id, name, email } = res.data;

                }).catch((error) => {
                    console.log("Ocorreu algum erro: ", error);
                    signOut();
                })
        }
    }, [])

    const signIn = async ({ email, password }: SignInProps) => {
        try {
            const data = {
                email,
                password
            }
            const response = await api.post("/login", data)
            const token = response.data.token
            saveTokenInCookies(token)
            api.defaults.headers["Authorization"] = `Bearer ${token}`
            toast.success("Login realizado com sucesso!");
            Router.push("/dashboard")
        } catch (error) {
            toast.error("Erro ao fazer login!");
            console.log(error)
        }

    }

    const saveTokenInCookies = (token: string) => {
        setCookie(undefined, "auth_token", token, {
            maxAge: 60 * 60 * 24 * 30, // expira em 1 mes
            path: "/" // Quais caminhos terão acesso ao cookie
        })
    }

    return (
        <AuthContext.Provider value={{ signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}