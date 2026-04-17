import styles from "./styles.module.css"
import Container from "../../components/container"
import ProductsList from "../../components/productsList"
import { useSelector } from "react-redux"
import { useParams } from "react-router"

export default function ProductsPage({ title = "", products = [] }) {
  const { data: categories } = useSelector(state => state.categories)

  let { categorieId } = useParams()

  const category = categories.find(item => item.id === Number(categorieId))

  console.log(category)

  if (products.length > 0)
    return (
      <Container>
        <div className={styles.productsInner}>
          <h2 className={styles.title}>{title}</h2>
          <ProductsList productsList={products} />
        </div>
      </Container>
    )

  return (
    <Container>
      <div className={styles.productsInner}>
        <h2 className={styles.title}>{"hel"}</h2>
        {/* <ProductsList productsList={products} /> */}
      </div>
    </Container>
  )
}
