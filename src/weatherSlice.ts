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
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${weatherApiKey}`
    );
    const data = await response.json();
    return data;
  }
);

interface WeatherDescription {
  main: string;
  description: string;
}

interface Hour {
  dt: number;
  temp: number;
  clouds: number;
  wind_speed: number;
  wind_gust: number;
  wind_deg: number;
  wind_string: string;
  pop: number;
  rain?: number;
  snow?: number;
  weather: string;
}

interface HourRaw {
  dt: number;
  temp: number;
  clouds: number;
  wind_speed: number;
  wind_gust: number;
  wind_deg: number;
  pop: number;
  rain?: {
    "1h": number;
  };
  snow?: {
    "1h": number;
  };
  weather: WeatherDescription[];
}

interface Day {
  dt: number;
  sunrise: number;
  sunset: number;
  moonphase: number;
  min_temp: number;
  max_temp: number;
  night_temp: number;
  clouds: number;
  humidity: number;
  wind_speed: number;
  wind_gust: number;
  wind_deg: number;
  wind_string: string;
  pop: number;
  rain?: number;
  snow?: number;
  weather: string;
}

interface DayRaw {
  dt: number;
  sunrise: number;
  sunset: number;
  moonphase: number;
  temp: {
    min: number;
    max: number;
    night: number;
  };
  clouds: number;
  humidity: number;
  wind_speed: number;
  wind_gust: number;
  wind_deg: number;
  pop: number;
  rain?: {
    "1h": number;
  };
  snow?: {
    "1h": number;
  };
  weather: WeatherDescription[];
}

interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  pressure: number;
  humidity: number;
  clouds: number;
  uvi: number;
  visibility: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  wind_string: string;
  rain?: number;
  snow?: number;
  weather: string;
}

interface CurrentRaw {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  pressure: number;
  humidity: number;
  clouds: number;
  uvi: number;
  visibility: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  rain?: {
    "1h": number;
  };
  snow?: {
    "1h": number;
  };
  weather: WeatherDescription[];
}

interface RawWeatherData {
  timezone_offset: number;
  current: CurrentRaw;
  hourly: HourRaw[];
  daily: DayRaw[];
}

interface WeatherData {
  offset: number;
  current: Current;
  hourly: Hour[];
  daily: Day[];
}

const windDirectionToString = (deg: number): string => {
  if (deg < 15 || deg > 345) {
    return "С";
  }
  if (deg < 75) {
    return "С-В";
  }
  if (deg < 105) {
    return "В";
  }
  if (deg < 165) {
    return "Ю-В";
  }
  if (deg < 195) {
    return "Ю";
  }
  if (deg < 255) {
    return "Ю-З";
  }
  if (deg < 285) {
    return "З";
  } else {
    return "С-З";
  }
};

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
