import styles from "./styles.module.scss"

// Next Components
import Image from "next/image"
import { FiLogOut } from "react-icons/fi"
import Link from "next/link"

// Assets
import logo from "../../../public/logo.svg"

import { AuthContext } from "@/contexts/AuthContext"
import { useContext } from "react"

const Header = () => {

    const {signOut} = useContext(AuthContext)

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.headerLogo}>
                    <Link href="/dashboard">
                        <Image src={logo} width={190} height={60}  alt="Logo pizzaria"></Image>
                    </Link>
                </div>
                <div className={styles.navbar}>
                    <Link href="/category">Categoria</Link>
                    <Link href="/product">Cardápio</Link>
                    <button onClick={signOut}><FiLogOut/></button>
                </div>
            </div>
        </header>
    )
}

export default Header