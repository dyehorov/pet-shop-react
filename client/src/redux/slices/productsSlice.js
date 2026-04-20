import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const BASE_URL = "http://localhost:3333"

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/all`)

      if (response.status > 399) {
        console.log("Client error")

        throw new Error("Error: Failed to fetch posts")
      }

      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  },
)

export const fetchCategoryProducts = createAsyncThunk(
  "products/fetchCategoryProducts",
  async (categoryId, thunkApi) => {
    try {
      const response = await axios.get(`${BASE_URL}/categories/${categoryId}`)

      if (response.status > 399) {
        console.log("Client error")

        throw new Error("Error: Failed to fetch category products")
      }

      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  },
)

const setLoading = state => {
  state.status = "loading"
  state.error = null
}

const setError = (state, action) => {
  state.status = "failed"
  state.error = action.payload
}

const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    categoryData: null,
    status: "idle",
    categoryStatus: "idle",
    error: null,
    categoryError: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, setLoading)
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(fetchProducts.rejected, setError)

    builder
      .addCase(fetchCategoryProducts.pending, state => {
        state.categoryStatus = "loading"
        state.categoryError = null
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.categoryStatus = "succeeded"
        state.categoryData = action.payload
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.categoryStatus = "failed"
        state.categoryError = action.payload
      })
  },
})

export default productsSlice.reducer
