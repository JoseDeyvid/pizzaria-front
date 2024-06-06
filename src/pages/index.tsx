import styles from "@/styles/Home.module.scss";

// Next Components
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import Link from "next/link";

// Assets
import logo from "../../public/logo.svg"

// Components
import { Input } from "../components/ui/Input";
import Button from "@/components/ui/Button";

// Contexts
import { AuthContext } from "@/contexts/AuthContext";


// React Frameworks
import { FormEvent, useState, useContext } from "react";
import { toast } from "react-toastify";

// Services
import {api} from "@/services/apiClient";
import { setCookie } from "nookies";
import canSSRGuest  from "@/utils/canSSRGuest";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {signIn} = useContext(AuthContext)


  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()

    if(!fieldsAreValids()) {
      return;
    }

    await signIn({email, password});

  }

  const fieldsAreValids = () => {
    if ( email === "" || password === "") {
        toast.error("Prencha todos os campos!");
        return false;
    }

    return true
}
  
  return (
    <>
      <Head>
        <title>Faça seu login</title>
      </Head>

      <div className={styles.container}>
        <Image src={logo} alt="Logo Sujeito Pizzaria"></Image>
        <div className={styles.form}>
          <form onSubmit={handleSignIn}>
            <Input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit">Acessar</Button>
          </form>
            <a className={styles.link} href="/signup" >Não possui uma conta? Cadastre-se</a>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest