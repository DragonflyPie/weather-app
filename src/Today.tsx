import React from "react";
import { useAppSelector } from "./hooks";

const Today = () => {
  const timeOffset = useAppSelector(
    (state) => state.weather.value?.timezone_offset
  );
  const currentWeather = useAppSelector(
    (state) => state.weather.value?.current
  );

  let localDate = "";
  let capitilizedDate = "";
  let localTime = "";
  let localSunrise = "";
  let localSunset = "";

  if (currentWeather && timeOffset) {
    localDate = new Date(
      (currentWeather?.dt + timeOffset) * 1000
    ).toLocaleString("ru", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });

    capitilizedDate = localDate[0].toUpperCase() + localDate.slice(1);

    localTime = new Date(
      (currentWeather?.dt + timeOffset) * 1000
    ).toLocaleString("ru", {
      timeZone: "UTC",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    localSunrise = new Date(
      (currentWeather?.sunrise + timeOffset) * 1000
    ).toLocaleString("ru", {
      timeZone: "UTC",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    localSunset = new Date(
      (currentWeather?.sunset + timeOffset) * 1000
    ).toLocaleString("ru", {
      timeZone: "UTC",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const pressure = currentWeather
    ? (currentWeather.pressure * 0.750062).toFixed(0)
    : "";

  return (
    <div className="today-grid">
      <div className="">{capitilizedDate}</div>
      <div className="">{currentWeather?.weather.main}</div>
      <div className="">{currentWeather?.weather.description}</div>

      <div className="">Влажность: {currentWeather?.humidity}%</div>
      <div className="">Время: {localTime}</div>
      <div className="">Температура: {currentWeather?.temp}&#176;C</div>
      <div className="">Давление: {pressure} мм рт. ст.</div>
      <div className="">Восход: {localSunrise}</div>
      <div className="">Закат: {localSunset}</div>
      <div className="">Видимость: {currentWeather?.visibility}</div>
      <div className="">Направление ветра: {currentWeather?.wind_deg}</div>
      <div className="">Скорость ветра: {currentWeather?.wind_speed}</div>
      {/* <div className="">Порывы ветра: {currentWeather?.wind_gust}</div> */}
      {currentWeather?.rain && (
        <div className="">Дождь: {currentWeather?.rain?.["1h"]}</div>
      )}
      {currentWeather?.snow && (
        <div className="">Снег: {currentWeather?.snow?.["1h"]}</div>
      )}
    </div>
  );
};

export default Today;
