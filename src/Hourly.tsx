import React, { useEffect } from "react";
import { WeatherState } from "./weatherSlice";
import { useAppSelector } from "./hooks";
import { timeFromDate } from "./utils";

type HourlyProps = {
  weatherData: WeatherState["value"];
};

const Hourly = ({ weatherData }: HourlyProps) => {
  if (weatherData === undefined) {
    return <div className="">No data</div>;
  }

  const slicedHours = weatherData.hourly.slice(0, 13);
  return (
    <div className="hours">
      {slicedHours.map((hour) => (
        <div key={timeFromDate(hour.dt)} className="">
          <div className="">{timeFromDate(hour.dt)}</div>
          <div className="">{hour.temp}&#176;C</div>
          <div className="">{hour.clouds}</div>
          <div className="">{hour.pop}</div>
          <div className="">{hour.weather}</div>
        </div>
      ))}
    </div>
  );
};

export default Hourly;
