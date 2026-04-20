import { Link } from "react-router"
import { useSelector } from "react-redux"
import Container from "../../components/container"
import styles from "./styles.module.css"
import BreadCrumbs from "../../components/breadCrumbs"
import CategoriesList from "../../components/categoriesList"

export default function Categories() {
  return (
    <Container>
      <div className={styles.categoriesInner}>
        <BreadCrumbs
          previous={[{ title: "Main page", path: "/" }]}
          current="Categories"
        />
        <h2 className={styles.title}>Categories</h2>
        <CategoriesList />
      </div>
    </Container>
  )
}
