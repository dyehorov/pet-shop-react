import styles from "./styles.module.css"
import Container from "../../components/container"
import SectionTitle from "../../components/sectionTitle"
import { useSelector } from "react-redux"
import SectionList from "../../components/sectionList"

export default function CategoriesSection() {
  const { data: categories } = useSelector(state => state.categories)

  return (
    <section className={styles.categories}>
      <Container>
        <div className={styles.categoriesInner}>
          <SectionTitle title={"categories"} />
          <SectionList sectionList={categories} />
        </div>
      </Container>
    </section>
  )
}
