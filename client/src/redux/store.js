import { configureStore } from "@reduxjs/toolkit"
import categoriesSlice from "./slices/categoriesSlice"
import productsSlice from "./slices/productsSlice"

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    products: productsSlice,
  },
})

export default store
