
import {api} from "@/services/apiClient";
import { ContextProps } from "@/utils/types";
import {useState, createContext } from "react";
import { ProductProps } from "./ProductContext";


type OrderContextValues = {
    updateOrders: () => Promise<void>,
    orders: OrderProps[],
    getItemsByOrderId: (id: number) => Promise<ItemProps[]>,
    finishOrder: (id: number) => Promise<void>
}

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
  }
  
export type ItemProps = {
    id: number,
    amount: number,
    order: OrderProps,
    product: ProductProps
}

export const OrderContext = createContext({} as OrderContextValues)

export const OrderProvider = ({children}: ContextProps) => {

    const [orders, setOrders] = useState<OrderProps[]>([])

    const getItemsByOrderId = async(id: number) => {
        try {
            const res = await api.get("/order/detail", {
                params: {
                    order_id: id
                }
            })
            
            return res.data as ItemProps[];
        } catch (error) {
            console.log("Ocorreu algum erro: ", error)
            return [];
        }
    }

    const updateOrders = async () => {
        try {
            const response = await api.get("/orders");
            setOrders(response.data);
        } catch (error) {
            console.log("Ocorreu um erro ao buscar os pedidos: ", error);
        }
    }

    const finishOrder = async(id: number) => {
        try {
            await api.put("/order/finish", {
                id: id
            })
            updateOrders();
            return;
        } catch (error) {
            console.log("Ocorreu algum erro: ", error);
            return;
        }
    }

    return (
        <OrderContext.Provider value={{updateOrders, orders, getItemsByOrderId, finishOrder}}>{children}</OrderContext.Provider>
    )
}

