import styles from "./styles.module.css"
import { Link } from "react-router"

export default function CategoriesListItem({ id, title, image }) {
  return (
    <Link to={`/categories/${id}`} className={styles.card}>
      <li className={styles.content}>
        <div className={styles.categorieImage}>
          <img src={`http://localhost:3333${image}`} alt={`${title} image`} />
        </div>
        <p className={styles.title}>{title}</p>
      </li>
    </Link>
  )
}
