import { ChangeEvent, ChangeEventHandler, FormEvent, useContext, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { FiUpload } from "react-icons/fi"
// Next Components
import Head from "next/head"

// My Components
import { Input, TextArea } from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import Header from "@/components/Header"
import canSSRAuth from "@/utils/canSSRAuth"

// Contexts
import { CategoryContext, CategoryProps } from "@/contexts/CategoryContext"
import { ProductContext } from "@/contexts/ProductContext"

const Product = () => {
    const [categories, setCategories] = useState<CategoryProps[]>([])
    const { getCategories } = useContext(CategoryContext);
    const { createProduct } = useContext(ProductContext);

    const [productImage, setProductImage] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string>("")
    const [categorySelected, setCategorySelected] = useState<CategoryProps>(categories[0] || "")
    const [productName, setProductName] = useState<string>("")
    const [productPrice, setProductPrice] = useState<string>("")
    const [productDescription, setProductDescription] = useState<string>("")

    useEffect(() => {
        const loadCategories = async () => {
            setCategories(await getCategories());
        }
        loadCategories();
    }, [])



    // const handleProductImage = (e: ChangeEvent<HTMLInputElement>) => {
    //     if (!e.target.files) {
    //         return;
    //     }

    //     const image = e.target.files[0];

    //     if (!image) {
    //         return;
    //     }

    //     if (image.type === "image/jpeg" || image.type === "image/png") {
    //         setProductImage(image)
    //         setImageUrl(URL.createObjectURL(image))
    //     }
    // }

    const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategorySelected(categories[e.target.selectedIndex])
    }

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault()
        await createProduct({
            description: productDescription,
            file: null,
            // file: productImage,
            name: productName,
            price: productPrice,
            category_id: categorySelected.id ? String(categorySelected.id) : String(categories[0].id)
        })
        setProductImage(null);
        setProductName("");
        setProductPrice("");
        setProductDescription("");
        setImageUrl("");
    }

    return (

        <>
            <Head>
                <title>Cadastrando produto!</title>
            </Head>

            <Header />

            <main className={styles.container}>
                <h1>Novo produto</h1>
                <form className={styles.form} onSubmit={handleRegister}>
                    {/* <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload size={30} color="#FFF" />
                        </span>
                        <input type="file" accept="image/png, image/jpeg" onChange={handleProductImage} />
                        {imageUrl && (
                            <img
                                className={styles.preview}
                                src={imageUrl}
                                alt="Foto do produto"
                                width={250}
                                height={250}
                            />
                        )}
                    </label> */}
                    <select name="categories" id="categories" value={categorySelected.name} onChange={handleCategory}>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    <Input type="text" className={styles.input} placeholder="Digite o nome do produto" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    <Input type="text" className={styles.input} placeholder="Preço do produto" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                    <TextArea className={styles.input} placeholder="Descrição do produto" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                    <Button type="submit" className={styles.buttonAdd}>Cadastrar</Button>
                </form>
            </main>

        </>
    )
}

export const getServerSideProps = canSSRAuth

export default Product