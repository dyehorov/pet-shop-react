import styles from "./styles.module.css"
import { Link } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from "../../redux/slices/cartSlice"

export default function ProductsListItem({
  id,
  image,
  title,
  price,
  discont_price,
}) {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)

  const isInCart = cartItems.some(item => item.id === id)

  const discountPercent = discont_price
    ? Math.round(((price - discont_price) / price) * 100)
    : null

  const handleAddToCart = event => {
    event.stopPropagation()

    dispatch(
      addToCart({
        id,
        image,
        title,
        price,
        discont_price,
      }),
    )
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
        <button
          className={styles.addToCartButton}
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? "In cart" : "Add to cart"}
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
