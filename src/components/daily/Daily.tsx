import React from "react";
import { useAppSelector } from "../../utilities/hooks";
import {
  convertPressure,
  dayFromDate,
  tempToString,
  timeFromDate,
} from "../../utilities/utils";
import WeatherIcon from "../common/WeatherIcon";
import {
  WiBarometer,
  WiHumidity,
  WiMoonrise,
  WiMoonset,
  WiWindDeg,
} from "react-icons/wi";
import { RiWindyLine } from "react-icons/ri";
import { BsSunrise, BsSunset } from "react-icons/bs";
import MoonPhase from "../common/MoonPhase";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";

const Daily = () => {
  const weatherData = useAppSelector((state) => state.weather.value?.daily);
  const status = useAppSelector((state) => state.weather.status);

  if (status === "loading") {
    return <Spinner />;
  }
  if (!weatherData) {
    return <div className="">Something went wrong</div>;
  }

  return (
    <div className="daily">
      {weatherData.map((day) => (
        <div key={day.dt} className="day">
          <Link to={`/day/${day.dt.toString()}`}>
            <div className="day__dt">{dayFromDate(day.dt)}</div>
          </Link>
          <div className="day__main">
            <div className="day__column right">
              <div>
                Утро:{" "}
                <span className="bold">{tempToString(day.temp_day)}&#176;</span>
              </div>
              <div>
                День:{" "}
                <span className="bold">{tempToString(day.temp_day)}&#176;</span>
              </div>
              <div>
                Вечер:{" "}
                <span className="bold">{tempToString(day.temp_day)}&#176;</span>
              </div>

              <div>
                Ночь:{" "}
                <span className="bold">
                  {tempToString(day.temp_night)}&#176;
                </span>
              </div>
            </div>
            <div className="day__column">
              <WeatherIcon iconName={day.icon} />
              <div>{day.weather}</div>
            </div>
            <div className="day__column">
              <WiWindDeg style={{ transform: `rotate(${day.wind_deg}deg)` }} />
              <div>{day.wind_speed.toFixed(0)} м/с</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Daily;
