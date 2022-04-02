import React from "react";
import { useAppSelector } from "./hooks";
import Hourly from "./Hourly";
import { CgArrowLongDownC } from "react-icons/cg";
import { convertPressure, dayFromDate, timeFromDate } from "./utils";

const Today = () => {
  const weatherData = useAppSelector((state) => state.weather.value);
  if (!weatherData) {
    return <div className="">Nothing to show</div>;
  }

  return (
    <>
      <div className="today-grid">
        <div className="">{dayFromDate(weatherData.current.dt)}</div>
        <div className="">{weatherData.current.weather}</div>
        <div className="">Влажность: {weatherData.current.humidity}%</div>
        <div className="">Время: {timeFromDate(weatherData.current.dt)}</div>
        <div className="">Температура: {weatherData.current.temp}&#176;C</div>
        <div className="">
          Давление: {convertPressure(weatherData.current.pressure)} мм рт. ст.
        </div>
        <div className="">
          Восход: {timeFromDate(weatherData.current.sunrise)}
        </div>
        <div className="">
          Закат: {timeFromDate(weatherData.current.sunset)}
        </div>
        <div className="">Видимость: {weatherData.current.visibility}</div>
        <div className="">
          Направление ветра:
          {weatherData.current.wind_string}
          <CgArrowLongDownC
            style={{ transform: `rotate(${weatherData.current.wind_deg}deg)` }}
          />
        </div>
        <div className="">Скорость ветра: {weatherData.current.wind_speed}</div>
        <div className="">Порывы ветра: {weatherData.current?.wind_gust}</div>
        {weatherData.current.rain && (
          <div className="">Дождь: {weatherData.current.rain}</div>
        )}
        {weatherData.current.snow && (
          <div className="">Снег: {weatherData.current.snow}</div>
        )}
      </div>
      <Hourly weatherData={weatherData} />
    </>
  );
};

export default Today;
