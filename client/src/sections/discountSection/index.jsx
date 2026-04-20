import styles from "./styles.module.css"
import { useForm } from "react-hook-form"
import Container from "../../components/container"
import petsImg from "../../assets/discount-pets.png"
import { useDispatch } from "react-redux"
import { getDiscount } from "../../redux/slices/categoriesSlice"
import { useState } from "react"
import Form from "../../components/form"

export default function DiscountSection() {
  const [isDiscountRequested, setIsDiscountRequested] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  })

  const dispatch = useDispatch()

  const submitDiscountRequest = () => {
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

            <Form
              className={styles.form}
              register={register}
              errors={errors}
              onSubmit={handleSubmit(submitDiscountRequest)}
              submitLabel="Get a discount"
              successLabel="Request Submitted"
              status={isDiscountRequested ? "succeeded" : "idle"}
              theme="dark"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
