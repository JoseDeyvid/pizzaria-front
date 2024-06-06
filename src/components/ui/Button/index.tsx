import { ButtonHTMLAttributes } from "react"
import styles from "./styles.module.scss"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{}

const Button = ({...rest}: ButtonProps) => {
  return (
    <button className={styles.button} {...rest} />
  )
}

export default Button