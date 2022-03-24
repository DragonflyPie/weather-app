import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from "@reduxjs/toolkit";

interface Location {
  city: string;
  regionName: string;
  lat: string;
  lon: string;
}

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

export interface locationState {
  status: "idle" | "loading" | "succeeded" | "failed";
  value: {
    city: string;
    regionName: string;
    lat: string;
    lon: string;
  };
}

const initialState: locationState = {
  status: "idle",
  value: {
    city: "Moscow",
    regionName: "",
    lat: "55.7512",
    lon: "37.6184",
  },
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
    });
  },
});

export const { updateLocation } = locationSlice.actions;

export default locationSlice.reducer;
