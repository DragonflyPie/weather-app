import type {
  LocationGeoTree,
  Location,
  WeatherTimesOfDayDescription,
  TimesOfDay,
} from "./types";
const dayjs = require("dayjs");
require("dayjs/locale/ru");
const localizedFormat = require("dayjs/plugin/localizedFormat");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
dayjs.extend(localizedFormat);

export const convertPressure = (pressureInHPa: number): string => {
  return (pressureInHPa * 0.750062).toFixed(0);
};

export const timeFromDate = (dt: number): string => {
  return dayjs.unix(dt).utc().format("HH:mm");
};

export const userTimeFromDate = (dt: number): string => {
  return dayjs.unix(dt).format("HH:mm");
};

export const dayFromDate = (dt: number): string => {
  const date = dayjs.unix(dt).locale("ru").format("dddd, D MMMM");
  return date[0].toUpperCase() + date.slice(1);
};

export const windDirectionToString = (deg: number): string => {
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

export const flattenGeoData = (e: LocationGeoTree): Location => {
  const geoData: Location = {
    city: e.value.split(",")[0].split(" ")[1],
    regionName: e.value.split(",")[1],
    lat: e.geo_center.lat,
    lon: e.geo_center.lon,
  };
  return geoData;
};

export const tempToString = (temp: number): string => {
  const t = temp.toFixed(0).replace("-0", "0");
  return temp > 0 ? `+${t}` : t;
};

export const getTimeOfDay = (data: TimesOfDay) => {
  if (
    dayjs.unix(data.time).hour() >= dayjs.unix(data.sunrise).hour() &&
    dayjs.unix(data.time).hour() < dayjs.unix(data.sunset).hour()
  ) {
    return "day";
  }
  return "night";
};

export const getIconName = ({
  id,
  time = "day",
}: WeatherTimesOfDayDescription): string => {
  if (id === 800) {
    return `clear-${time}`;
  }
  if (id === 801 || id === 802 || id === 803) {
    return `clouds-few-${time}`;
  }
  if (id === 804) {
    return `clouds-${time}`;
  }
  if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
    return `rain-${time}`;
  }
  if (id >= 600 && id <= 622) {
    return `snow-${time}`;
  }
  if (id >= 200 && id <= 232) {
    return `thunder-${time}`;
  }
  if ((id >= 701 && id <= 721) || id === 741) {
    return `mist-${time}`;
  }
  return "other";
};
