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
  WiMoonrise,
  WiMoonset,
  WiWindDeg,
} from "react-icons/wi";
import { BsSunrise, BsSunset } from "react-icons/bs";
import { RiWindyLine } from "react-icons/ri";
import MoonPhase from "../common/MoonPhase";

const Current = () => {
  const weatherData = useAppSelector((state) => state.weather.value?.current);
  const todayWeatherData = useAppSelector(
    (state) => state.weather.value?.daily[0]
  );

  if (!weatherData || !todayWeatherData) {
    return <div className="current">No data</div>;
  }

  return (
    <div className="weather">
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
        <div>
          <WiHumidity /> {weatherData.humidity}%
        </div>
        <div>
          <WiBarometer /> {convertPressure(weatherData.pressure)} мм рт.ст.
        </div>
      </div>
      <div className="weather__bar">
        <div className="weather__group">
          <RiWindyLine />
          <div className="weather__column left">
            <div>Скорость - {weatherData.wind_speed.toFixed(0)} м/с</div>
            <div>Порывы - {weatherData.wind_gust?.toFixed(1)} м/с</div>
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
        <div className="weather__group">
          <BsSunrise /> {timeFromDate(weatherData.sunrise)}
        </div>
        <div className="weather__group">
          <BsSunset /> {timeFromDate(weatherData.sunset)}
        </div>
      </div>
      <div className="weather__bar">
        <div className="weather__group">
          <WiMoonrise /> {timeFromDate(todayWeatherData.moonrise)}
        </div>
        <div className="weather__moonphase">
          <MoonPhase phase={todayWeatherData.moonphase} />
        </div>
        <div className="weather__group">
          <WiMoonset /> {timeFromDate(todayWeatherData.moonset)}
        </div>
      </div>
    </div>
  );
};

export default Current;
