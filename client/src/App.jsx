import "./App.css"
import Layout from "./layout"
import { Routes, Route, useParams } from "react-router"
import Home from "./pages/home"
import Categories from "./pages/categories"
import ProductsPage from "./pages/productsPage"
import { useSelector, useDispatch } from "react-redux"
import { fetchProducts } from "./redux/slices/productsSlice"
import { fetchCategories } from "./redux/slices/categoriesSlice"
import { useEffect } from "react"

export default function App() {
  const dispatch = useDispatch()
  const { data: products } = useSelector(state => state.products)
  const { data: categories } = useSelector(state => state.categories)

  const discountedItems = products.filter(
    product => product.discont_price !== null,
  )

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories/all" element={<Categories />} />
          <Route path="categories/:categorieId" element={<ProductsPage />} />
          <Route
            path="products/all"
            element={
              <ProductsPage title={"All products"} products={products} />
            }
          />
          <Route
            path="products/allSales"
            element={
              <ProductsPage
                title={"Discounted items"}
                products={discountedItems}
              />
            }
          />
          {/* <Route path="districts/:districtId" element={<District />} />
          <Route
            path="districts/:districtId/places/:placeId"
            element={<Place />}
          />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </>
  )
}
