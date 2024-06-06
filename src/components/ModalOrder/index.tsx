import ReactModal from "react-modal"
import { FiX } from "react-icons/fi"
import styles from "./styles.module.scss"
import { ItemProps, OrderContext } from "@/contexts/OrderContext"
import { useContext } from "react"


type ModalOrderProps = {
  modalOpen: boolean,
  handleCloseModal: () => void,
  data: ItemProps[]

}
const ModalOrder = ({ modalOpen, handleCloseModal, data }: ModalOrderProps) => {
  const { finishOrder } = useContext(OrderContext);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1d1d2e',
      padding: "30px"
    },
  };

  const handleFinishOrder = async (id: number) => {
    finishOrder(id);
    handleCloseModal();
  }

  return (
    <ReactModal isOpen={modalOpen} style={customStyles} onRequestClose={handleCloseModal}>
      <div className={styles.container}>
        <main className={styles.content}>
          <button className={styles.closeModalButton} onClick={handleCloseModal}>
            <FiX size={45} color="#f34748" />
          </button>
          <h1 className={styles.title}>Detalhes do pedido</h1>

          {data.length > 0 && (
            <div className={styles.orderDetails}>
              <h2 className={styles.table}>Mesa: {data[0].order.table} </h2>
              {data.map((item) => (
                <div className={styles.item} key={item.id}>
                  <p>{item.amount} - <span>{item.product.name}</span></p>
                  <p>{item.product.description}</p>
                </div>
              ))}
              <button className={styles.finishOrder} onClick={() => handleFinishOrder(Number(data[0].order.id))}>Concluir pedido</button>
            </div>
          )}

        </main>
      </div>
    </ReactModal>
  )
}

export default ModalOrder