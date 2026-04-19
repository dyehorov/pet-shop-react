import styles from "./styles.module.css"
import Container from "../../components/container"
import petsImg from "../../assets/discount-pets.png"
import { useDispatch } from "react-redux"
import { getDiscount } from "../../redux/slices/categoriesSlice"
import { useState } from "react"

export default function DiscountSection() {
  const [isDiscountRequested, setIsDiscountRequested] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = event => {
    event.preventDefault()

    dispatch(getDiscount())

    setIsDiscountRequested(true)
  }

  return (
    <section className={styles.discountSection}>
      <Container>
        <div className={styles.discountSectionInner}>
          <h2 className={styles.title}>5% off on the first order</h2>

          <div className={styles.content}>
            <div className={styles.imageBox}>
              <img src={petsImg} alt="Pets" className={styles.image} />
            </div>

            <form
              className={styles.form}
              onSubmit={event => handleSubmit(event)}
            >
              <input
                type="text"
                placeholder="Name"
                className={styles.input}
                required
              />
              <input
                type="tel"
                placeholder="Phone number"
                className={styles.input}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                required
              />
              <button
                type="submit"
                className={
                  isDiscountRequested
                    ? `${styles.buttonSubmitted} ${styles.button}`
                    : styles.button
                }
                disabled={isDiscountRequested}
              >
                {isDiscountRequested ? "Request Submitted" : "Get a discount"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
