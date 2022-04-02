import React from "react";
import { useAppSelector } from "./hooks";
import { dayFromDate } from "./utils";

const Daily = () => {
  const weatherData = useAppSelector((state) => state.weather.value);
  if (!weatherData) {
    return null;
  }

  return (
    <div>
      {weatherData.daily.map((day) => (
        <div className="" key={dayFromDate(day.dt)}>
          <div className="">{dayFromDate(day.dt)}</div>
          <div className="">Clouds:{day.clouds}%</div>
          <div className="">Osadki: {day.pop}</div>
          <div className="">Влажность: {day.humidity}%</div>
          <div className="">Napravlenie: {day.wind_deg} deg</div>
          <div className="">Порывы: {day.wind_gust}м/с</div>
          <div className="">Ветер: {day.wind_speed}м/с</div>
          <div className="">
            Днём: {day.min_temp > 0 && "+"}
            {day.min_temp.toFixed(0).replace("-0", "0")}...
            {day.max_temp > 0 && "+"}
            {day.max_temp.toFixed(0).replace("-0", "0")}&#176;C
          </div>
          <div className="">
            Ночью: {day.night_temp > 0 && "+"}
            {day.night_temp.toFixed(0).replace("-0", "0")}&#176;C
          </div>
          <div className="">Description: {day.weather}</div>
          {day.rain && <div className="">Rain: {day.rain} mm</div>}
          {day.snow && <div className="">Снег: {day.snow} mm</div>}
        </div>
      ))}
    </div>
  );
};

export default Daily;
