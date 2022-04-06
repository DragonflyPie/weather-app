import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LocationGeoTree } from "../utilities/types";
import { geoTreeKey as key } from "../apiKey";

// const key = process.env.REACT_APP_GEOTREE_API_KEY;

export const fetchLocationByQuery = createAsyncThunk(
  "location/locationByQuery",
  async (query: string) => {
    const response = await fetch(
      `https://api.geotree.ru/search.php?term=${query}&types=place&level=4&fields=value,geo_center&limit=10&key=${key}`
    );
    const data = await response.json();
    return data;
  }
);

interface SuggestionsState {
  status: "idle" | "loading" | "succeeded" | "failed";
  value?: LocationGeoTree[];
  error?: string;
}

const initialState: SuggestionsState = {
  status: "idle",
};

export const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLocationByQuery.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchLocationByQuery.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchLocationByQuery.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message;
    });
  },
});

export default suggestionsSlice.reducer;
