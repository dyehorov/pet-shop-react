import { Link } from "react-router"
import { useSelector } from "react-redux"
import Container from "../../components/container"
import styles from "./styles.module.css"
import { Breadcrumb } from "antd"
import CategoriesList from "../../components/categoriesList"

export default function Categories() {
  return (
    <Container>
      <div className={styles.categoriesInner}>
        <h2 className={styles.title}>Categories</h2>
        <CategoriesList />
      </div>
    </Container>
  )
}
