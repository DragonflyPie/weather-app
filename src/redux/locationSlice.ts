import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Location } from "../utilities/types";

export const fetchGeoLocationByIp = createAsyncThunk(
  "location/locationByIp",
  async (_) => {
    const response = await fetch(
      "http://ip-api.com/json/?fields=57563&lang=ru"
    );
    const data = await response.json();
    return data;
  }
);

interface locationState {
  status: "idle" | "loading" | "succeeded" | "failed";
  value?: Location;
  error?: string;
}

const initialState: locationState = {
  status: "idle",
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    updateLocation: (state, action: PayloadAction<Location>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGeoLocationByIp.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchGeoLocationByIp.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.value = action.payload;
    });
    builder.addCase(fetchGeoLocationByIp.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { updateLocation } = locationSlice.actions;

export default locationSlice.reducer;
