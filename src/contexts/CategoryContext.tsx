import { api } from "@/services/apiClient";
import { ContextProps } from "@/utils/types";
import { createContext } from "react";
import { toast } from "react-toastify";

type CategoryContextValues = {
    createCategory: (name: string) => Promise<boolean>,
    getCategories: () => Promise<CategoryProps[]>
}

export type CategoryProps = {
    id: number,
    name: string
}

export const CategoryContext = createContext({} as CategoryContextValues)


export const CategoryProvider = ({children}: ContextProps) => {

    const createCategory = async (name: string) => {
        try {
            await api.post("/new-category", {
                name
            });
            toast.success("Categoria criada com sucesso!");
            return true;
        } catch (error) {
            toast.error("Ocorreu algum erro na criação da categoria!");
            console.log("Deu erro: ", error);
            return false;
        }
    }

    const getCategories = async () => {
        try {
            const response = await api.get("/categories")
            return response.data as CategoryProps[]
        } catch (error) {
            console.log("Ocorreu algum erro: ", error)
            return []
        }
    }

    return (
        <CategoryContext.Provider value={{createCategory, getCategories}}>
            {children}
        </CategoryContext.Provider>
    )
}