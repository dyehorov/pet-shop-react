import "./App.css"
import Layout from "./layout"
import { Routes, Route } from "react-router"
import Home from "./pages/home"
import Categories from "./pages/categories"
import ProductsPage from "./pages/productsPage"
import Product from "./pages/product"
import NotFound from "./pages/notFound"
import Cart from "./pages/cart"
import { useSelector, useDispatch } from "react-redux"
import { fetchProducts } from "./redux/slices/productsSlice"
import { fetchCategories } from "./redux/slices/categoriesSlice"
import { useEffect } from "react"
import { BrowserRouter } from "react-router"

export default function App() {
  const dispatch = useDispatch()
  const { data: products } = useSelector(state => state.products)

  const discountedItems = products.filter(
    product => product.discont_price !== null,
  )

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories/all" element={<Categories />} />
          <Route path="categories/:categorieId" element={<ProductsPage />} />
          <Route path="products/:productId" element={<Product />} />
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
                breadcrumbTitle={"All sales"}
                products={discountedItems}
              />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
