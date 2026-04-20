import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const BASE_URL = "http://localhost:3333"

const getCartItemsFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem("shopping-cart")

    return savedCart ? JSON.parse(savedCart) : []
  } catch {
    return []
  }
}

const saveCartItems = items => {
  try {
    localStorage.setItem("shopping-cart", JSON.stringify(items))
  } catch (error) {
    console.error("Failed to save cart to localStorage", error)
  }
}

const initialState = {
  items: getCartItemsFromLocalStorage(),
  orderResponse: null,
  status: "idle",
  error: null,
}

export const sendOrder = createAsyncThunk(
  "cart/sendOrder",
  async (orderData, thunkApi) => {
    try {
      const response = await axios.post(`${BASE_URL}/order/send`, orderData)
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to send order",
      )
    }
  },
)

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const quantityToAdd = product.quantity || 1
      const existingItem = state.items.find(item => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += quantityToAdd
      } else {
        state.items.push({
          ...product,
          quantity: quantityToAdd,
        })
      }

      saveCartItems(state.items)
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      saveCartItems(state.items)
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload)

      if (item) item.quantity += 1
      saveCartItems(state.items)
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload)

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.items = state.items.filter(
            cartItem => cartItem.id !== action.payload,
          )
        }
      }

      saveCartItems(state.items)
    },

    clearCart: state => {
      state.items = []
      saveCartItems(state.items)
    },

    resetOrderState: state => {
      state.orderResponse = null
      state.status = "idle"
      state.error = null
    },
  },

  extraReducers: builder => {
    builder
      .addCase(sendOrder.pending, state => {
        state.status = "loading"
        state.error = null
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.orderResponse = action.payload
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload || "Failed to send order"
      })
  },
})

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  resetOrderState,
} = cartSlice.actions

export default cartSlice.reducer
