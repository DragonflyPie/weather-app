import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  Hour,
  HourRaw,
  Day,
  DayRaw,
  Location,
  WeatherData,
  RawWeatherData,
  Current,
  CurrentRaw,
} from "../utilities/types";
import {
  getIconName,
  getTimeOfDay,
  windDirectionToString,
} from "../utilities/utils";
import { weatherApiKey as key } from "../apiKey";

// const key = process.env.REACT_APP_OPENWEATHER_API_KEY;

export const fetchWeatherData = createAsyncThunk(
  "weather/now",
  async (location: Location) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&lang=ru&units=metric&appid=${key}`
    );
    const data = await response.json();
    return data;
  }
);

const flattenHour = (hour: HourRaw, current: CurrentRaw): Hour => {
  return {
    dt: hour.dt,
    temp: hour.temp,
    clouds: hour.clouds,
    wind_speed: hour.wind_speed,
    wind_gust: hour.wind_gust,
    pop: hour.pop,
    wind_deg: hour.wind_deg,
    wind_string: windDirectionToString(hour.wind_deg),
    rain: hour.rain?.["1h"],
    snow: hour.snow?.["1h"],
    weather:
      hour.weather[0].description[0].toUpperCase() +
      hour.weather[0].description.slice(1),
    icon: getIconName({
      id: hour.weather[0].id,
      time: getTimeOfDay({
        time: hour.dt,
        sunrise: current.sunrise,
        sunset: current.sunset,
      }),
    }),
  };
};

const flattenDay = (day: DayRaw, offset: number): Day => {
  return {
    dt: day.dt,
    sunrise: day.sunrise + offset,
    sunset: day.sunset + offset,
    moonphase: day.moon_phase * 100,
    moonrise: day.moonrise + offset,
    moonset: day.moonset + offset,
    humidity: day.humidity,
    clouds: day.clouds,
    temp_morn: day.temp.morn,
    temp_day: day.temp.day,
    temp_eve: day.temp.eve,
    temp_night: day.temp.night,
    wind_speed: day.wind_speed,
    wind_gust: day.wind_gust,
    pop: day.pop,
    pressure: day.pressure,
    wind_deg: day.wind_deg,

    wind_string: windDirectionToString(day.wind_deg),
    rain: day.rain?.["1h"],
    snow: day.snow?.["1h"],
    weather:
      day.weather[0].description[0].toUpperCase() +
      day.weather[0].description.slice(1),
    icon: getIconName({ id: day.weather[0].id }),
  };
};

const flattenCurrent = (current: CurrentRaw, offset: number): Current => {
  return {
    dt: current.dt,
    sunrise: current.sunrise + offset,
    sunset: current.sunset + offset,
    temp: current.temp,
    pressure: current.pressure,
    humidity: current.humidity,
    clouds: current.clouds,
    uvi: current.uvi,
    visibility: current.visibility,
    wind_speed: current.wind_speed,
    wind_gust: current.wind_gust,
    wind_deg: current.wind_deg,
    wind_string: windDirectionToString(current.wind_deg),
    rain: current.rain?.["1h"],
    snow: current.snow?.["1h"],
    weather:
      current.weather[0].description[0].toUpperCase() +
      current.weather[0].description.slice(1),
    icon: getIconName({ id: current.weather[0].id }),
  };
};

const flattenWeatherData = (data: RawWeatherData): WeatherData => {
  const weatherData: WeatherData = {
    offset: data.timezone_offset,
    current: flattenCurrent(data.current, data.timezone_offset),
    hourly: data.hourly.map((hour) => flattenHour(hour, data.current)),
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
    builder.addCase(fetchWeatherData.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.value = flattenWeatherData(action.payload);
    });
    builder.addCase(fetchWeatherData.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export default weatherSlice.reducer;
