import {api} from "@/services/apiClient"
import { ContextProps } from "@/utils/types"
import { createContext } from "react"
import { toast } from "react-toastify"

type ProductContextValues = {
    createProduct: (data: CreationProductProps) => Promise<void>
}

export type ProductProps = {
    id: number,
    banner: string,
    category_id: number,
    description: string,
    name: string,
    price: number
}

export type CreationProductProps = {
    name: string,
    price: string,
    description: string,
    file: File | null,
    category_id: string
}


const ProductContext = createContext({} as ProductContextValues)

const ProductProvider = ({ children }: ContextProps) => {

    const createProduct = async (data: CreationProductProps) => {
        // const product = new FormData();
        // product.append('name', data.name);
        // product.append('price', data.price);
        // product.append('description', data.description);
        // product.append('category_id', data.category_id);
        // product.append('file', data.file!);
        try {
            const res = await api.post("/new-product", data)
            toast.success("Produto criado com sucesso!")
        } catch (error) {
            console.log("Ocorreu algum erro!", error)
            toast.error("Não foi possível criar o produto!")
        }
    }
    return (
        <ProductContext.Provider value={{ createProduct }}>
            {children}
        </ProductContext.Provider>
    )
}

export { ProductContext, ProductProvider }

