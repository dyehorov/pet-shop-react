import styles from "./styles.module.css"
import ProductsListItem from "../productsListItem"

export default function ProductsList({ productsList }) {
  if (productsList.length === 0) {
    return (
      <div className={styles.emptyState}>
        No products found for the selected filters.
      </div>
    )
  }

  return (
    <ul className={styles.productsList}>
      {productsList.map(product => (
        <ProductsListItem key={product.id} {...product} />
      ))}
    </ul>
  )
}
