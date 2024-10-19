import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { search, category, sortBy, currentPage, order } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://66c12088ba6f27ca9a585a64.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    // console.log("thunkAPI:", thunkAPI);
    return data;
  }
);
