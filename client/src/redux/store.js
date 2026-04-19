import { configureStore } from "@reduxjs/toolkit"
import categoriesSlice from "./slices/categoriesSlice"
import productsSlice from "./slices/productsSlice"
import productSlice from "./slices/productSlice"
import cartSlice from "./slices/cartSlice"

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    products: productsSlice,
    product: productSlice,
    cart: cartSlice,
    orderResponse: cartSlice,
  },
})

export default store
