import styles from "./styles.module.css"
import { Flex, Modal } from "antd"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Container from "../../components/container"
import { useSelector, useDispatch } from "react-redux"
import Form from "../../components/form"
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  sendOrder,
  clearCart,
  resetOrderState,
} from "../../redux/slices/cartSlice"

export default function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    items: cartItems,
    orderResponse,
    status,
    error,
  } = useSelector(state => state.cart)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const totalPrice = cartItems.reduce((acc, item) => {
    const actualPrice = item.discont_price || item.price

    return acc + actualPrice * item.quantity
  }, 0)

  useEffect(() => {
    if (status === "succeeded" && orderResponse) {
      setIsModalOpen(true)
    }
  }, [status, orderResponse])

  const submitOrder = formData => {
    const orderData = {
      ...formData,
      products: cartItems.map(item => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
      })),
      totalPrice,
      totalItems,
    }

    dispatch(sendOrder(orderData))
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    dispatch(clearCart())
    dispatch(resetOrderState())
    reset()
  }

  if (cartItems.length === 0) {
    return (
      <section className={styles.cartSection}>
        <Container>
          <Flex align="center" className={styles.sectionTitleWrapper}>
            <h2 className={styles.title}>Shopping cart</h2>
            <div className={styles.line}></div>
            <button onClick={() => navigate(-1)} className={styles.button}>
              Back to the store
            </button>
          </Flex>

          <div className={styles.emptyCart}>
            <p className={styles.emptyMessage}>
              Looks like you have no items in your basket currently.
            </p>
            <button
              onClick={() => navigate("/products/all")}
              className={styles.continueButton}
            >
              Continue Shopping
            </button>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className={styles.cartSection}>
      <Container>
        <Flex align="center" className={styles.sectionTitleWrapper}>
          <h2 className={styles.title}>Shopping cart</h2>
          <div className={styles.line}></div>
          <button onClick={() => navigate(-1)} className={styles.button}>
            Back to the store
          </button>
        </Flex>

        <div className={styles.cartContent}>
          <div className={styles.cartList}>
            {cartItems.map(item => {
              const actualPrice = item.discont_price || item.price

              return (
                <article key={item.id} className={styles.cartItem}>
                  <div className={styles.imageBox}>
                    <img
                      src={`http://localhost:3333${item.image}`}
                      alt={item.title}
                      className={styles.image}
                    />
                  </div>

                  <div className={styles.itemInfo}>
                    <div className={styles.itemTop}>
                      <h3 className={styles.itemTitle}>{item.title}</h3>

                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        ×
                      </button>
                    </div>

                    <div className={styles.itemBottom}>
                      <div className={styles.counter}>
                        <button
                          type="button"
                          className={styles.counterButton}
                          onClick={() => dispatch(decrementQuantity(item.id))}
                        >
                          −
                        </button>

                        <span className={styles.counterValue}>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          className={styles.counterButton}
                          onClick={() => dispatch(incrementQuantity(item.id))}
                        >
                          +
                        </button>
                      </div>

                      <div className={styles.priceBox}>
                        <span className={styles.currentPrice}>
                          ${actualPrice * item.quantity}
                        </span>

                        {item.discont_price && (
                          <span className={styles.oldPrice}>
                            ${item.price * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <aside className={styles.orderDetails}>
            <h3 className={styles.orderTitle}>Order details</h3>

            <p className={styles.itemsCount}>{totalItems} items</p>

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <Form
              className={styles.orderForm}
              register={register}
              errors={formErrors}
              onSubmit={handleSubmit(submitOrder)}
              submitLabel="Order"
              loadingLabel="Sending..."
              successLabel="The Order is Placed"
              status={status}
              error={status === "failed" ? error : null}
            />
          </aside>
        </div>

        <Modal
          open={isModalOpen}
          onCancel={handleCloseModal}
          footer={null}
          closable={true}
          centered
          className={styles.successModal}
        >
          <div className={styles.successContent}>
            <h3 className={styles.successTitle}>Congratulations!</h3>
            <p className={styles.successText}>
              Your order has been successfully placed on the website.
            </p>
            <p className={styles.successText}>
              A manager will contact you shortly to confirm your order.
            </p>
          </div>
        </Modal>
      </Container>
    </section>
  )
}
