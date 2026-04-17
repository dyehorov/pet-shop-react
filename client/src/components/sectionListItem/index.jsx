import styles from "./styles.module.css"
import { Link } from "react-router"

export default function SectionListItem({
  id,
  image,
  title,
  price,
  discont_price,
}) {
  const discountPercent = discont_price
    ? Math.round(((price - discont_price) / price) * 100)
    : null

  if (!price)
    return (
      <Link to={`/categories/${id}`} className={styles.card}>
        <div className={styles.content}>
          <div className={styles.categorieImage}>
            <img src={`http://localhost:3333${image}`} alt={`${title} image`} />
          </div>
          <p className={styles.title}>{title}</p>
        </div>
      </Link>
    )

  return (
    <Link to={`/products/${id}`} className={styles.cardProduct}>
      <div className={styles.imageWrapper}>
        {discountPercent && (
          <span className={styles.discountBadge}>-{discountPercent}%</span>
        )}

        <img
          src={`http://localhost:3333${image}`}
          alt={title}
          className={styles.image}
        />
      </div>
      <div className={`${styles.content} ${styles.contentSales}`}>
        <p className={styles.titleSales}>{title}</p>
        <div className={styles.priceBlock}>
          <span className={styles.currentPrice}>${discont_price}</span>
          <span className={styles.oldPrice}>${price}</span>
        </div>
      </div>
    </Link>
  )
}
