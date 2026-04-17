import { Link } from "react-router"
import { useSelector } from "react-redux"
import Container from "../../components/container"
import styles from "./styles.module.css"
import { Breadcrumb } from "antd"

export default function Categories() {
  const { data: categories } = useSelector(state => state.categories)

  return (
    <Container>
      <div className={styles.categoriesInner}>
        <Breadcrumb
          separator="-"
          items={[
            {
              title: "Main page",
            },
            {
              title: "Categories",
              href: "",
            },
          ]}
        />
        <h2 className={styles.title}>Categories</h2>
        <ul>{}</ul>
      </div>
    </Container>
  )
}
