import type { LocationGeoTree, Location } from "./types";
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
  let geoData: Location = {
    city: e.value.split(",")[0].split(" ")[1],
    regionName: e.value.split(",")[1],
    lat: e.geo_center.lat,
    lon: e.geo_center.lon,
  };
  return geoData;
};

export const tempToString = (temp: number): string => {
  let t = temp.toFixed(0).replace("-0", "0");
  return temp > 0 ? `+${t}` : t;
};
