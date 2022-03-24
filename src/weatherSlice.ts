import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { weatherApiKey } from "./apiKey";

interface Location {
  city: string;
  regionName: string;
  lat: string;
  lon: string;
}

export const fetchNow = createAsyncThunk(
  "weather/now",
  async (location: Location) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${weatherApiKey}`
    );
    const data = await response.json();
    return data;
  }
);

export interface locationState {
  status: "idle" | "loading" | "succeeded" | "failed";
  value: string;
}

const initialState: locationState = {
  status: "idle",
  value: "",
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNow.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchNow.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.value = action.payload;
    });
    builder.addCase(fetchNow.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const {} = weatherSlice.actions;

export default weatherSlice.reducer;
