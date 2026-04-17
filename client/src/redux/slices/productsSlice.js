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
    status: "idle",
    error: null,
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
  },
})

export default productsSlice.reducer
