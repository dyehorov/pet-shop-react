import styles from "./styles.module.css"
import Container from "../../components/container"
import SectionTitle from "../../components/sectionTitle"
import { useSelector } from "react-redux"
import SectionList from "../../components/sectionList"

export default function SalesSection() {
  const { data: products } = useSelector(state => state.products)

  const getProductsWithSale = () => {
    return products.filter(product => product.discont_price !== null)
  }

  return (
    <section className={styles.salesSection}>
      <Container>
        <div className={styles.categoriesInner}>
          <SectionTitle title={"sales"} />
          <SectionList sectionList={getProductsWithSale()} />
        </div>
      </Container>
    </section>
  )
}
