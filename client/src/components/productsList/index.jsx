import styles from "./styles.module.css"
import ProductsListItem from "../productsListItem"

export default function ProductsList({ productsList }) {
  return (
    <ul className={styles.productsList}>
      {productsList.map(product => (
        <ProductsListItem key={product.id} {...product} />
      ))}
    </ul>
  )
}
