import styles from "./styles.module.css"
import { Link } from "react-router"

export default function ProductsListItem({
  id,
  image,
  title,
  price,
  discont_price,
}) {
  const discountPercent = discont_price
    ? Math.round(((price - discont_price) / price) * 100)
    : null

  const handleAddToCart = event => {
    event.stopPropagation()

    console.log("ADD TO CART:", id)
  }

  return (
    <div className={styles.cardProduct}>
      <Link to={`/products/${id}`} className={styles.linkOverlay} />
      <div className={styles.imageWrapper}>
        {discountPercent && (
          <span className={styles.discountBadge}>-{discountPercent}%</span>
        )}
        <img
          src={`http://localhost:3333${image}`}
          alt={title}
          className={styles.image}
        />
        <button className={styles.addToCartButton} onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <div className={styles.priceBlock}>
          <span className={styles.currentPrice}>${discont_price || price}</span>
          {discont_price && <span className={styles.oldPrice}>${price}</span>}
        </div>
      </div>
    </div>
  )
}
