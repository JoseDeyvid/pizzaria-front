// Styles
import styles from "../../styles/Home.module.scss"

//Next Components
import Head from "next/head"
import Image from "next/image"
import Router from "next/router"

// Assets
import logo from "../../../public/logo.svg"

// Custom Components
import { Input } from "@/components/ui/Input"
import Button from "@/components/ui/Button"

// React Frameworks
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"

//Services
import { api } from "@/services/apiClient"
import canSSRGuest from "@/utils/canSSRGuest"

type SignUpProps = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}


const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();

        if (!fieldsAreValids()) {
            return;
        }

        await signUp()

    }

    const fieldsAreValids = () => {
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            toast.error("Prencha todos os campos!");
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Senhas não coincidem!");
            return false;
        }

        return true
    }

    const signUp = async () => {
        try {
            const data = {
                name,
                email,
                password,
                confirmPassword
            }

            const response = await api.post("/new-user", data)
            toast.success("Conta criada com sucesso!");
            Router.push("/")
        } catch (error) {
            toast.error("Erro ao cadastrar o usuário!")
            console.log("Meu erro:", error)
        }



    }

    return (
        <>
            <Head>
                <title>Cadastre-se</title>
            </Head>
            <div className={styles.container}>
                <Image src={logo} alt="Logo Sujeito Pizza" />
                <div className={styles.form}>
                    <h1>Criando sua conta</h1>
                    <form onSubmit={handleSignUp}>
                        <Input placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)} />
                        <Input placeholder="Digite seu email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input placeholder="Digite sua senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Input placeholder="Confirmação de senha" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <Button type="submit">Cadastrar</Button>
                    </form>
                    <a className={styles.link} href="/">Já possui uma conta? Fazer login!</a>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRGuest

export default Signup