import styles from "./styles.module.scss"
import { FormEvent, useContext, useState } from "react"

// Next Components
import Head from "next/head"

// My components
import Header from "@/components/Header"
import { Input } from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import canSSRAuth from "@/utils/canSSRAuth"

// Contexts
import { CategoryContext } from "@/contexts/CategoryContext"

const Category = () => {
    const [categoryName, setCategoryName] = useState<string>("")
    const { createCategory } = useContext(CategoryContext);

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault()
        if (await createCategory(categoryName)) {
            setCategoryName("")
        }
    }

    return (
        <>
            <Head>
                <title>Cadastrando categoria!</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Cadastrar Categoria</h1>
                    <form className={styles.form} onSubmit={handleRegister} >
                        <Input placeholder="Digite o nome da categoria" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                        <Button type="submit" className={styles.buttonAdd}>Cadastrar</Button>
                    </form>
                </main>
            </div>



        </>
    )
}

export const getServerSideProps = canSSRAuth


export default Category