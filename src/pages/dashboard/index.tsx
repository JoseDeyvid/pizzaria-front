import styles from "./styles.module.scss"
import { useEffect, useContext, useState } from "react"


// Next Components
import Head from "next/head"

// My Components
import Header from "@/components/Header"

// Contexts
import { ItemProps, OrderContext } from "@/contexts/OrderContext"

// Assets
import {FiRefreshCcw } from "react-icons/fi"
import canSSRAuth from "@/utils/canSSRAuth"
import ModalOrder from "@/components/ModalOrder"
import Modal from "react-modal"

const Dashboard = () => {
  const { updateOrders, orders, getItemsByOrderId } = useContext(OrderContext)

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ItemProps[]>([]);

  const closeModal = () => {
    setModalOpen(false);
  }

  const showModal = async(id: number) => {
    const res = await getItemsByOrderId(id);
    setModalData(res);
    setModalOpen(true);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateOrders()
    }, 5000);

    return () => clearInterval(interval);
  }, [])

  Modal.setAppElement("#__next")

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Header />

      <div className={styles.orders}>
        <div className={styles.title}>
          <h1>Últimos pedidos</h1>
          <button><FiRefreshCcw size={25} color="#3fffa3" /></button>
        </div>
        {orders.length !== 0 ? orders.map((order) => (
          <section key={order.id} className={styles.orderItem}>
            <div className={styles.tag}></div>
            <button className={styles.showOrderButton} onClick={() => showModal(Number(order.id))}>
              <span>Mesa {order.table}</span>
            </button>
          </section>
        )) : <h3>Nenhum pedido aberto foi encontrado...</h3>}


        <ModalOrder handleCloseModal={closeModal} modalOpen={modalOpen} data={modalData} />
      </div>

    </>
  )
}

export const getServerSideProps = canSSRAuth

export default Dashboard