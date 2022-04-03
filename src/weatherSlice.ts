import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { weatherApiKey } from "./apiKey";
import {
  Hour,
  HourRaw,
  Day,
  DayRaw,
  Location,
  WeatherData,
  RawWeatherData,
  Current,
} from "./types";
import { windDirectionToString } from "./utils";

export const fetchNow = createAsyncThunk(
  "weather/now",
  async (location: Location) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${weatherApiKey}`
    );
    const data = await response.json();
    return data;
  }
);

const flattenHour = (hour: HourRaw, offset: number): Hour => {
  return {
    dt: hour.dt + offset,
    temp: hour.temp,
    clouds: hour.clouds,
    wind_speed: hour.wind_speed,
    wind_gust: hour.wind_gust,
    pop: hour.pop,
    wind_deg: hour.wind_deg,
    wind_string: windDirectionToString(hour.wind_deg),
    rain: hour.rain?.["1h"],
    snow: hour.snow?.["1h"],
    weather: hour.weather[0].description,
  };
};

const flattenDay = (day: DayRaw, offset: number): Day => {
  return {
    dt: day.dt + offset,
    sunrise: day.sunrise + offset,
    sunset: day.sunset + offset,
    moonphase: day.moonphase,
    humidity: day.humidity,
    clouds: day.clouds,
    min_temp: day.temp.min,
    max_temp: day.temp.max,
    night_temp: day.temp.night,
    wind_speed: day.wind_speed,
    wind_gust: day.wind_gust,
    pop: day.pop,
    wind_deg: day.wind_deg,
    wind_string: windDirectionToString(day.wind_deg),
    rain: day.rain?.["1h"],
    snow: day.snow?.["1h"],
    weather: day.weather[0].description,
  };
};

const flattenWeatherData = (data: RawWeatherData): WeatherData => {
  const weatherData: WeatherData = {
    offset: data.timezone_offset,
    current: {
      dt: data.current.dt + data.timezone_offset,
      sunrise: data.current.sunrise + data.timezone_offset,
      sunset: data.current.sunset + data.timezone_offset,
      temp: data.current.temp,
      pressure: data.current.temp,
      humidity: data.current.humidity,
      clouds: data.current.clouds,
      uvi: data.current.uvi,
      visibility: data.current.visibility,
      wind_speed: data.current.wind_speed,
      wind_gust: data.current.wind_gust,
      wind_deg: data.current.wind_deg,
      wind_string: windDirectionToString(data.current.wind_deg),
      rain: data.current.rain?.["1h"],
      snow: data.current.snow?.["1h"],
      weather: data.current.weather[0].description,
    },
    hourly: data.hourly.map((hour) => flattenHour(hour, data.timezone_offset)),
    daily: data.daily.map((day) => flattenDay(day, data.timezone_offset)),
  };
  return weatherData;
};

export interface WeatherState {
  status: "idle" | "loading" | "succeeded" | "failed";
  value?: {
    offset: number;
    current: Current;
    hourly: Hour[];
    daily: Day[];
  };
}

const initialState: WeatherState = {
  status: "idle",
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
      state.value = flattenWeatherData(action.payload);
    });
    builder.addCase(fetchNow.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const {} = weatherSlice.actions;

export default weatherSlice.reducer;
