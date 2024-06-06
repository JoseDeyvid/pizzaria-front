import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "@/contexts/AuthContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { CategoryProvider } from "@/contexts/CategoryContext";
import { ProductProvider } from "@/contexts/ProductContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <OrderProvider>
          <CategoryProvider>
            <ProductProvider>
              <Component {...pageProps} />
              <ToastContainer autoClose={3000} />
            </ProductProvider>
          </CategoryProvider>
        </OrderProvider>
      </AuthProvider>
    </>
  );
}
