import React from "react";
import { useAppSelector } from "./hooks";

interface TimeProps {
  dt: number;
  offset: number;
}

const NextDays = () => {
  const weatherData = useAppSelector((state) => state.weather.value);
  if (!weatherData) {
    return null;
  }

  const getHour = ({ dt, offset }: TimeProps): string => {
    return new Date((dt + offset) * 1000).toLocaleString("ru", {
      timeZone: "UTC",
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      {weatherData.daily.map((day) => (
        <div className="" key={day.dt}>
          <div className="">
            {getHour({ dt: day.dt, offset: weatherData.timezone_offset })}
          </div>
          <div className="">Clouds:{day.clouds}%</div>
          <div className="">Osadki: {day.pop}</div>
          <div className="">Влажность: {day.humidity}%</div>
          <div className="">Napravlenie: {day.wind_deg} deg</div>
          <div className="">Порывы: {day.wind_gust}м/с</div>
          <div className="">Ветер: {day.wind_speed}м/с</div>
          <div className="">
            Днём: {day.temp.min > 0 && "+"}
            {day.temp.min.toFixed(0).replace("-0", "0")}...
            {day.temp.max > 0 && "+"}
            {day.temp.max.toFixed(0).replace("-0", "0")}&#176;C
          </div>
          <div className="">
            Ночью: {day.temp.night > 0 && "+"}
            {day.temp.night.toFixed(0).replace("-0", "0")}&#176;C
          </div>
          <div className="">Влажность: {day.humidity}%</div>
          <div className="">Влажность: {day.humidity}%</div>
          <div className="">Description: {day.weather[0].description}</div>
          {day.rain && <div className="">Rain: {day.rain} mm</div>}
          {day.snow && <div className="">Снег: {day.snow} mm</div>}
        </div>
      ))}
    </div>
  );
};

export default NextDays;
