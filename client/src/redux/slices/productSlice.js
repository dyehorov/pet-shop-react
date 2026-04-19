import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const BASE_URL = "http://localhost:3333"

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (productId, thunkApi) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${productId}`)

      if (response.status > 399) {
        console.log("Client error")

        throw new Error("Error: Failed to fetch product")
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

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProduct.pending, setLoading)
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded"

        state.data = action.payload[0] || null
      })
      .addCase(fetchProduct.rejected, setError)
  },
})

export default productSlice.reducer
