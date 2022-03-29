import React from "react";
import { useAppSelector } from "./hooks";

const NextDays = () => {
  const dailyWeather = useAppSelector((state) => state.weather.value?.daily);
  if (!dailyWeather) {
    return null;
  }

  return (
    <div>
      {dailyWeather.map((day) => (
        <div className="" key={day.dt}>
          <div className="">{day.clouds}</div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
        </div>
      ))}
    </div>
  );
};

export default NextDays;
