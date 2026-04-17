import styles from "./styles.module.css"
import Container from "../../components/container"
import SectionTitle from "../../components/sectionTitle"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchProducts } from "../../redux/slices/productsSlice"
import SectionList from "../../components/sectionList"

export default function SalesSection() {
  const dispatch = useDispatch()
  const { data: products } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(fetchProducts())

    console.log(products)
  }, [dispatch])

  const getProductsWithSale = () => {
    return products.filter(product => product.discont_price !== null)
  }

  return (
    <section className={styles.sale}>
      <Container>
        <div className={styles.categoriesInner}>
          <SectionTitle title={"sales"} />
          <SectionList sectionList={getProductsWithSale()} />
        </div>
      </Container>
    </section>
  )
}
