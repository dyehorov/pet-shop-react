import styles from "./styles.module.css"
import { useSelector, useDispatch } from "react-redux"
import CategoriesListItem from "../categoriesListItem"
import { useEffect } from "react"
import { fetchCategories } from "../../redux/slices/categoriesSlice"

export default function CategoriesList() {
  const dispatch = useDispatch()
  const { data: categories } = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <ul className={styles.categoriesList}>
      {categories.map(categorie => (
        <CategoriesListItem key={categorie.id} {...categorie} />
      ))}
    </ul>
  )
}
