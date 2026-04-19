import styles from "./styles.module.css"
import Container from "../../components/container"
import ProductsList from "../../components/productsList"
import { useParams } from "react-router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategoryProducts } from "../../redux/slices/productsSlice"
import BreadCrumbs from "../../components/breadCrumbs"

export default function ProductsPage({ title = "", products = [] }) {
  const dispatch = useDispatch()
  let { categorieId } = useParams()
  const { categoryData, categoryStatus, categoryError } = useSelector(
    state => state.products,
  )

  useEffect(() => {
    if (products.length > 0 || !categorieId) return
    dispatch(fetchCategoryProducts(categorieId))
  }, [dispatch, categorieId, products.length])

  if (products.length > 0)
    return (
      <Container>
        <div className={styles.productsInner}>
          <BreadCrumbs
            previous={[{ title: "Main page", path: "/" }]}
            current="All products"
          />
          <h2 className={styles.title}>{title}</h2>
          <ProductsList productsList={products} />
        </div>
      </Container>
    )

  if (categoryStatus === "loading")
    return (
      <Container>
        <div className={styles.productsInner}>
          <BreadCrumbs
            previous={[{ title: "Main page", path: "/" }]}
            current="All products"
          />
          <h2 className={styles.title}>Loading...</h2>
        </div>
      </Container>
    )

  if (categoryStatus === "failed")
    return (
      <Container>
        <div className={styles.productsInner}>
          <BreadCrumbs
            previous={[{ title: "Main page", path: "/" }]}
            current="All products"
          />
          <h2 className={styles.title}>
            {categoryError?.message || "Failed to load category products"}
          </h2>
        </div>
      </Container>
    )

  if (!categoryData?.category)
    return (
      <Container>
        <div className={styles.productsInner}>
          <BreadCrumbs
            previous={[{ title: "Main page", path: "/" }]}
            current="All products"
          />
          <h2 className={styles.title}>Category not found</h2>
        </div>
      </Container>
    )

  return (
    <Container>
      <div className={styles.productsInner}>
        <BreadCrumbs
          previous={[
            { title: "Main page", path: "/" },
            { title: "Categories", path: "/categories/all" },
          ]}
          current={categoryData.category.title}
        />
        <h2 className={styles.title}>{categoryData.category.title}</h2>
        <ProductsList productsList={categoryData.data} />
      </div>
    </Container>
  )
}
