import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const BASE_URL = "http://localhost:3333"

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(`${BASE_URL}/categories/all`)

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

export const getDiscount = createAsyncThunk(
  "categories/getDiscount",
  async () => {
    try {
      const response = await axios.post(`${BASE_URL}/sale/send`)

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

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, setLoading)
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(fetchCategories.rejected, setError)

    builder
      .addCase(getDiscount.pending, setLoading)
      .addCase(getDiscount.fulfilled, (state, action) => {
        state.status = "succeeded"
      })
      .addCase(getDiscount.rejected, setError)
  },
})

export default categoriesSlice.reducer
