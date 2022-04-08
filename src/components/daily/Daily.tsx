import React from "react";
import { useAppSelector } from "../../utilities/hooks";
import { dayFromDate, tempToString, timeFromDate } from "../../utilities/utils";
import { CgArrowLongDownC } from "react-icons/cg";

const Daily = () => {
  const weatherData = useAppSelector((state) => state.weather.value?.daily);
  if (!weatherData) {
    return <div className="">Something went wrong</div>;
  }

  return (
    <div className="daily">
      {weatherData.map((day) => (
        <div className="" key={dayFromDate(day.dt)}>
          <div className="">{dayFromDate(day.dt)}</div>
          <div className="">Clouds:{day.clouds}%</div>
          <div className="">Osadki: {day.pop}</div>
          <div className="">Влажность: {day.humidity}%</div>
          <div className="">
            Napravlenie: {day.wind_string}
            <CgArrowLongDownC
              style={{
                transform: `rotate(${day.wind_deg}deg)`,
              }}
            />
          </div>
          <div className="">Порывы: {day.wind_gust}м/с</div>
          <div className="">Ветер: {day.wind_speed}м/с</div>
          <div className="">Фаза луны: {day.moonphase}м/с</div>
          <div className="">Восход: {timeFromDate(day.sunrise)}м/с</div>
          <div className="">Закат: {timeFromDate(day.sunset)}м/с</div>

          <div className="">
            Днём:
            {tempToString(day.min_temp)}...
            {tempToString(day.max_temp)}&#176;C
          </div>
          <div className="">Ночью: {tempToString(day.night_temp)}&#176;C</div>
          <div className="">Description: {day.weather}</div>
          {day.rain && <div className="">Rain: {day.rain} mm</div>}
          {day.snow && <div className="">Снег: {day.snow} mm</div>}
        </div>
      ))}
    </div>
  );
};

export default Daily;
