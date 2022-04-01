import React, { useEffect } from "react";
import { WeatherState } from "./weatherSlice";
import { useAppSelector } from "./hooks";

type NextHoursProps = {
  weatherData: WeatherState["value"];
};

interface TimeProps {
  dt: number;
  offset: number;
}

const NextHours = ({ weatherData }: NextHoursProps) => {
  if (weatherData === undefined) {
    return <div className="">kek</div>;
  }

  const getHour = ({ dt, offset }: TimeProps): string => {
    return new Date((dt + offset) * 1000).toLocaleString("ru", {
      timeZone: "UTC",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const slicedHours = weatherData.hourly.slice(0, 13);
  return (
    <div className="hours">
      {slicedHours.map((hour) => (
        <div key={hour.dt} className="">
          <div className="">
            {getHour({ dt: hour.dt, offset: weatherData.timezone_offset })}
          </div>
          <div className="">{hour.temp}</div>
          <div className="">{hour.clouds}</div>
          <div className="">{hour.pop}</div>
          <div className="">{hour.weather[0].description}</div>
        </div>
      ))}
    </div>
  );
};

export default NextHours;
