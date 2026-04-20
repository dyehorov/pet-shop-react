import styles from "./styles.module.css"
import { useSelector } from "react-redux"
import CategoriesListItem from "../categoriesListItem"

export default function CategoriesList() {
  const { data: categories } = useSelector(state => state.categories)

  return (
    <ul className={styles.categoriesList}>
      {categories.map(categorie => (
        <CategoriesListItem key={categorie.id} {...categorie} />
      ))}
    </ul>
  )
}
