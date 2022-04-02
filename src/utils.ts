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
