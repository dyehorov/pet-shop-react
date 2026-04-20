import styles from "./styles.module.css"
import Container from "../../components/container"
import ProductsList from "../../components/productsList"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategoryProducts } from "../../redux/slices/productsSlice"
import BreadCrumbs from "../../components/breadCrumbs"
import ProductsFilter from "../../components/productsFilter"
import { filterProducts } from "../../utils/filterProducts"

export default function ProductsPage({
  title = "",
  breadcrumbTitle = "",
  products = [],
}) {
  const dispatch = useDispatch()
  let { categorieId } = useParams()
  const { categoryData, categoryStatus, categoryError } = useSelector(
    state => state.products,
  )

  const [filters, setFilters] = useState({
    priceFrom: "",
    priceTo: "",
    onlyDiscounted: false,
    sortType: "default",
  })

  useEffect(() => {
    if (products.length > 0 || !categorieId) return
    dispatch(fetchCategoryProducts(categorieId))
  }, [dispatch, categorieId, products.length])

  const sourceProducts =
    products.length > 0 ? products : (categoryData?.data ?? [])

  const filteredProducts = filterProducts(sourceProducts, filters)

  if (products.length > 0)
    return (
      <Container>
        <div className={styles.productsInner}>
          <BreadCrumbs
            previous={[{ title: "Main page", path: "/" }]}
            current={breadcrumbTitle || title}
          />
          <h2 className={styles.title}>{title}</h2>
          <ProductsFilter
            filters={filters}
            setFilters={setFilters}
            showDiscountFilter={title !== "Discounted items"}
          />
          <ProductsList productsList={filteredProducts} />
        </div>
      </Container>
    )

  if (categoryStatus === "loading")
    return (
      <Container>
        <div className={styles.productsInner}>
          <BreadCrumbs
            previous={[
              { title: "Main page", path: "/" },
              { title: "Categories", path: "/categories/all" },
            ]}
            current="Loading..."
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
            previous={[
              { title: "Main page", path: "/" },
              { title: "Categories", path: "/categories/all" },
            ]}
            current="Category"
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
            previous={[
              { title: "Main page", path: "/" },
              { title: "Categories", path: "/categories/all" },
            ]}
            current="Category not found"
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
        <ProductsFilter filters={filters} setFilters={setFilters} />
        <ProductsList productsList={filteredProducts} />
      </div>
    </Container>
  )
}
