export const convertPressure = (pressureInHPa: number): string => {
  return (pressureInHPa * 0.750062).toFixed(0);
};

export const timeFromDate = (dt: number): string =>
  new Date(dt * 1000).toLocaleString("ru", {
    timeZone: "UTC",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

export const dayFromDate = (dt: number): string => {
  const stringifyDate: string = new Date(dt * 1000).toLocaleString("ru", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return stringifyDate[0].toUpperCase() + stringifyDate.slice(1);
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
