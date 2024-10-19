import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { PizzaSliceState, Pizza, Status } from "../pizza/types";
import { SearchPizzaParams } from "./types";
import { fetchPizzas } from "./asyncAction";

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading | success | error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
        console.log(state.items);
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
