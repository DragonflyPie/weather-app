import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from "@reduxjs/toolkit";

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

export const fetchLocationByName = createAsyncThunk(
  "location/locationByName",
  async (query) => {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=e1b93cfee3fe37089c6071cf4de071ad`
    );
    const data = await response.json();
    return data;
  }
);

export interface locationState {
  status: "idle" | "loading" | "succeeded" | "failed";
  value: {
    lat: number;
    lon: number;
    city: string;
    country: string;
    countryCode: string;
  };
}

const initialState: locationState = {
  status: "idle",
  value: {
    lat: 55.7512,
    lon: 37.6184,
    city: "Moscow",
    country: "Russia",
    countryCode: "RU",
  },
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
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

    builder.addCase(fetchLocationByName.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchLocationByName.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(fetchLocationByName.rejected, (state, action) => {
      state.status = "loading";
    });
  },
});

export const {} = locationSlice.actions;

export default locationSlice.reducer;
