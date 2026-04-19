import styles from "./styles.module.css"
import { Link } from "react-router"

export default function CategoriesListItem({ id, title, image }) {
  return (
    <li className={styles.card}>
      <Link to={`/categories/${id}`} className={styles.link}>
        <div className={styles.categorieImage}>
          <img src={`http://localhost:3333${image}`} alt={`${title} image`} />
        </div>
        <p className={styles.title}>{title}</p>
      </Link>
    </li>
  )
}
