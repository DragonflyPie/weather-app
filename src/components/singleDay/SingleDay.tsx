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

interface SingleDayProps {
  day: number;
}

const SingleDay = ({ day }: SingleDayProps) => {
  const weatherData = useAppSelector(
    (state) => state.weather.value?.daily[day]
  );

  if (!weatherData) {
    return <div className="weather">No data</div>;
  }

  return (
    <div className="day-container">
      <div className="weather">
        <div className="weather__dt">{dayFromDate(weatherData.dt)}</div>
        <div className="weather__main">
          <div className="weather__column right">
            <div>
              Утро:{" "}
              <span className="bold">
                {tempToString(weatherData.temp_day)}&#176;
              </span>
            </div>
            <div>
              День:{" "}
              <span className="bold">
                {tempToString(weatherData.temp_day)}&#176;
              </span>
            </div>
            <div>
              Вечер:{" "}
              <span className="bold">
                {tempToString(weatherData.temp_day)}&#176;
              </span>
            </div>

            <div className="weather__daynight-temp">
              Ночь:{" "}
              <span className="bold">
                {tempToString(weatherData.temp_night)}&#176;
              </span>
            </div>
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
            <WiMoonrise /> {timeFromDate(weatherData.moonrise)}
          </div>
          <div className="weather__moonphase">
            <MoonPhase phase={weatherData.moonphase} />
          </div>
          <div className="weather__group">
            <WiMoonset /> {timeFromDate(weatherData.moonset)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDay;
