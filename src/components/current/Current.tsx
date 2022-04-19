import { useAppSelector } from "../../utilities/hooks";
import {
  convertPressure,
  dayFromDate,
  tempToString,
  timeFromDate,
  userTimeFromDate,
} from "../../utilities/utils";
import WeatherIcon from "../common/WeatherIcon";
import {
  WiBarometer,
  WiHumidity,
  WiStrongWind,
  WiWindDeg,
} from "react-icons/wi";
import { BsSunrise, BsSunset } from "react-icons/bs";
import { RiWindyLine } from "react-icons/ri";

const Current = () => {
  const weatherData = useAppSelector((state) => state.weather.value?.current);

  if (!weatherData) {
    return <div className="current">Nothing to show</div>;
  }

  return (
    <div className="current weather">
      <div className="weather__dt">
        {dayFromDate(weatherData.dt)} - {userTimeFromDate(weatherData.dt)}
      </div>
      <div className="weather__main">
        <div className="weather__temp">
          {tempToString(weatherData.temp)}&#176;
        </div>
        <div className="weather__column">
          <WeatherIcon iconName={weatherData.icon} />
          <div className="weather__description">{weatherData.weather}</div>
        </div>
      </div>
      <div className="weather__bar">
        <div className="weather__humidity">
          <WiHumidity /> {weatherData.humidity}%
        </div>
        <div className="weather__pressure">
          <WiBarometer /> {convertPressure(weatherData.pressure)} мм рт. ст.
        </div>
      </div>
      <div className="weather__bar">
        <div className="weather__wind-speed">
          <RiWindyLine />
          <div className="weather__column">
            <div className="">
              Скорость - {weatherData.wind_speed.toFixed(1)} м/с
            </div>
            <div className="">
              Порывы - {weatherData.wind_gust?.toFixed(1)} м/с
            </div>
          </div>
        </div>
        <div className="weather__column">
          <WiWindDeg
            style={{ transform: `rotate(${weatherData.wind_deg}deg)` }}
          />
          {weatherData.wind_string}
        </div>
      </div>
      <div className="weather__bar">
        <div className="weather__sunrise">
          <BsSunrise /> {timeFromDate(weatherData.sunrise)}
        </div>
        <div className="weather__sunset">
          <BsSunset /> {timeFromDate(weatherData.sunset)}
        </div>
      </div>
    </div>
  );
};

export default Current;
