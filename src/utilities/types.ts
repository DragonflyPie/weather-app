export interface Location {
  city: string;
  regionName: string;
  lat: string;
  lon: string;
}

export interface WeatherDescription {
  main: string;
  description: string;
  id: number;
}

export interface Hour {
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
  icon: string;
}

export interface HourRaw {
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

export interface Day {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moonphase: number;
  temp_morn: number;
  temp_day: number;
  temp_eve: number;
  temp_night: number;
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
  icon: string;
  pressure: number;
}

export interface DayRaw {
  dt: number;
  sunrise: number;
  sunset: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  temp: {
    morn: number;
    day: number;
    eve: number;
    night: number;
  };
  clouds: number;
  humidity: number;
  wind_speed: number;
  wind_gust: number;
  wind_deg: number;
  pop: number;
  pressure: number;
  rain?: {
    "1h": number;
  };
  snow?: {
    "1h": number;
  };
  weather: WeatherDescription[];
}

export interface Current {
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
  icon: string;
}

export interface CurrentRaw {
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

export interface RawWeatherData {
  timezone_offset: number;
  current: CurrentRaw;
  hourly: HourRaw[];
  daily: DayRaw[];
}

export interface WeatherData {
  offset: number;
  current: Current;
  hourly: Hour[];
  daily: Day[];
}

export interface LocationGeoTree {
  value: string;
  geo_center: {
    lat: string;
    lon: string;
  };
}

export interface WeatherTimesOfDayDescription {
  id: number;
  time?: "day" | "night";
}

export interface TimesOfDay {
  time: number;
  sunrise: number;
  sunset: number;
}
