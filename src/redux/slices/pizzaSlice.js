import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({ search, categoryId, sort, currentPage }, thunkAPI) => {
    const { data } = await axios.get(
      `https://66c12088ba6f27ca9a585a64.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${
        sort.sortProperty && sort.sortProperty.includes("-")
          ? `${sort.sortProperty.replace("-", "")}&order=asc`
          : `${sort.sortProperty}&order=desc`
      }${search}`
    );
    console.log("thunkAPI:", thunkAPI);
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", //loading | success | error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
        console.log(state.items);
      });
  },
});

export const selectPizzaData = (state) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
