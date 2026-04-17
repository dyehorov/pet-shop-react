import styles from "./styles.module.css"
import Container from "../../components/container"
import SectionTitle from "../../components/sectionTitle"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchCategories } from "../../redux/slices/categoriesSlice"
import SectionList from "../../components/sectionList"

export default function CategoriesSection() {
  const dispatch = useDispatch()
  const { data: categories } = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

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
