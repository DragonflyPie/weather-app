import React from "react";
import { useAppSelector } from "../../utilities/hooks";
import Hourly from "../hourly/Hourly";
import { CgArrowLongDownC } from "react-icons/cg";
import {
  convertPressure,
  dayFromDate,
  timeFromDate,
} from "../../utilities/utils";

const Current = () => {
  const weatherData = useAppSelector((state) => state.weather.value);
  if (!weatherData) {
    return <div className="current">Nothing to show</div>;
  }

  return (
    <div className="current">
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
    </div>
  );
};

export default Current;
