import React from "react";
import { useAppSelector } from "./hooks";
import NextHours from "./NextHours";
import { CgArrowLongDownC } from "react-icons/cg";

const Today = () => {
  const weatherData = useAppSelector((state) => state.weather.value);
  if (!weatherData) {
    return <div className="">kek</div>;
  }

  const localDate = new Date(
    (weatherData.current.dt + weatherData.timezone_offset) * 1000
  ).toLocaleString("ru", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const capitilizedDate = localDate[0].toUpperCase() + localDate.slice(1);

  const localTime = new Date(
    (weatherData.current.dt + weatherData.timezone_offset) * 1000
  ).toLocaleString("ru", {
    timeZone: "UTC",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunrise = new Date(
    (weatherData.current.sunrise + weatherData.timezone_offset) * 1000
  ).toLocaleString("ru", {
    timeZone: "UTC",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunset = new Date(
    (weatherData.current.sunset + weatherData.timezone_offset) * 1000
  ).toLocaleString("ru", {
    timeZone: "UTC",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

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

  const pressure = (weatherData.current.pressure * 0.750062).toFixed(0);

  return (
    <>
      <div className="today-grid">
        <div className="">{capitilizedDate}</div>
        <div className="">{weatherData.current.weather[0].description}</div>
        <div className="">Влажность: {weatherData.current.humidity}%</div>
        <div className="">Время: {localTime}</div>
        <div className="">Температура: {weatherData.current.temp}&#176;C</div>
        <div className="">Давление: {pressure} мм рт. ст.</div>
        <div className="">Восход: {sunrise}</div>
        <div className="">Закат: {sunset}</div>
        <div className="">Видимость: {weatherData.current.visibility}</div>
        <div className="">
          Направление ветра:
          {windDirectionToString(weatherData.current.wind_deg)}
          <CgArrowLongDownC
            style={{ transform: `rotate(${weatherData.current.wind_deg}deg)` }}
          />
        </div>
        <div className="">Скорость ветра: {weatherData.current.wind_speed}</div>
        {/* <div className="">Порывы ветра: {weatherData.current?.wind_gust}</div> */}
        {weatherData.current.rain && (
          <div className="">Дождь: {weatherData.current.rain?.["1h"]}</div>
        )}
        {weatherData.current.snow && (
          <div className="">Снег: {weatherData.current.snow?.["1h"]}</div>
        )}
      </div>
      <NextHours weatherData={weatherData} />
    </>
  );
};

export default Today;
