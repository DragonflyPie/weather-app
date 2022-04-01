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
  wind: number;
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
  rain?: {
    "1h": number;
  };
  snow?: {
    "1h": number;
  };
  weather: WeatherDescription[];
}

export interface WeatherState {
  status: "idle" | "loading" | "succeeded" | "failed";
  value?: {
    timezone_offset: number;
    current: Current;
    hourly: Hour[];
    daily: Day[];
  };
}

// lat Geographical coordinates of the location (latitude)
// lon Geographical coordinates of the location (longitude)
// timezone Timezone name for the requested location
// timezone_offset Shift in seconds from UTC
// current Current weather data API response
// current.dt Current time, Unix, UTC
// current.sunrise Sunrise time, Unix, UTC
// current.sunset Sunset time, Unix, UTC
// current.temp Temperature. Units - default: kelvin, metric: Celsius, imperial: Fahrenheit. How to change units used
// current.feels_like Temperature. This temperature parameter accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
// current.pressure Atmospheric pressure on the sea level, hPa
// current.humidity Humidity, %
// current.dew_point Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
// current.clouds Cloudiness, %
// current.uvi Current UV index
// current.visibility Average visibility, metres. The maximum value of the visibility is 10km
// current.wind_speed Wind speed. Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used
// current.wind_gust (where available) Wind gust. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used
// current.wind_deg Wind direction, degrees (meteorological)
// current.rain
// current.rain.1h (where available) Rain volume for last hour, mm
// current.snow
// current.snow.1h (where available) Snow volume for last hour, mm
// current.weather
// current.weather.id Weather condition id
// current.weather.main Group of weather parameters (Rain, Snow, Extreme etc.)
// current.weather.description Weather condition within the group (full list of weather conditions). Get the output in your language
// current.weather.icon Weather icon id. How to get icons
// minutely Minute forecast weather data API response
// minutely.dt Time of the forecasted data, unix, UTC
// minutely.precipitation Precipitation volume, mm
// hourly Hourly forecast weather data API response
// hourly.dt Time of the forecasted data, Unix, UTC
// hourly.temp Temperature. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. How to change units used
// hourly.feels_like Temperature. This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
// hourly.pressure Atmospheric pressure on the sea level, hPa
// hourly.humidity Humidity, %
// hourly.dew_point Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
// hourly.uvi UV index
// hourly.clouds Cloudiness, %
// hourly.visibility Average visibility, metres. The maximum value of the visibility is 10km
// hourly.wind_speed Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.How to change units used
// hourly.wind_gust (where available) Wind gust. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used
// chourly.wind_deg Wind direction, degrees (meteorological)
// hourly.pop Probability of precipitation. The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%
// hourly.rain
// hourly.rain.1h (where available) Rain volume for last hour, mm
// hourly.snow
// hourly.snow.1h (where available) Snow volume for last hour, mm
// hourly.weather
// hourly.weather.id Weather condition id
// hourly.weather.main Group of weather parameters (Rain, Snow, Extreme etc.)
// hourly.weather.description Weather condition within the group (full list of weather conditions). Get the output in your language
// hourly.weather.icon Weather icon id. How to get icons
// daily Daily forecast weather data API response
// daily.dt Time of the forecasted data, Unix, UTC
// daily.sunrise Sunrise time, Unix, UTC
// daily.sunset Sunset time, Unix, UTC
// daily.moonrise The time of when the moon rises for this day, Unix, UTC
// daily.moonset The time of when the moon sets for this day, Unix, UTC
// daily.moon_phase Moon phase. 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is 'full moon' and 0.75 is 'last quarter moon'. The periods in between are called 'waxing crescent', 'waxing gibous', 'waning gibous', and 'waning crescent', respectively.
// daily.temp Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. How to change units used
// daily.temp.morn Morning temperature.
// daily.temp.day Day temperature.
// daily.temp.eve Evening temperature.
// daily.temp.night Night temperature.
// daily.temp.min Min daily temperature.
// daily.temp.max Max daily temperature.
// daily.feels_like This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. How to change units used
// daily.feels_like.morn Morning temperature.
// daily.feels_like.day Day temperature.
// daily.feels_like.eve Evening temperature.
// daily.feels_like.night Night temperature.
// daily.pressure Atmospheric pressure on the sea level, hPa
// daily.humidity Humidity, %
// daily.dew_point Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
// daily.wind_speed Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used
// daily.wind_gust (where available) Wind gust. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used
// daily.wind_deg Wind direction, degrees (meteorological)
// daily.clouds Cloudiness, %
// daily.uvi The maximum value of UV index for the day
// daily.pop Probability of precipitation. The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%
// daily.rain (where available) Precipitation volume, mm
// daily.snow (where available) Snow volume, mm
// daily.weather
// daily.weather.id Weather condition id
// daily.weather.main Group of weather parameters (Rain, Snow, Extreme etc.)
// daily.weather.description Weather condition within the group (full list of weather conditions). Get the output in your language
// daily.weather.icon Weather icon id. How to get icons

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
      state.value = action.payload;
    });
    builder.addCase(fetchNow.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const {} = weatherSlice.actions;

export default weatherSlice.reducer;
