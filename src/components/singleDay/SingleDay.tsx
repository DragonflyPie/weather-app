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
import { useParams } from "react-router-dom";
import Spinner from "../common/Spinner";

const SingleDay = () => {
  const { dt } = useParams();
  const weatherData = useAppSelector((state) => state.weather.value?.daily);
  const status = useAppSelector((state) => state.weather.status);

  if (status === "loading") {
    return <Spinner />;
  }

  if (!weatherData || !dt) {
    return <div className="weather">No data</div>;
  }

  const day = weatherData?.find((day) => day.dt === parseInt(dt));

  if (!day) {
    return <div className="weather">No data</div>;
  }

  return (
    <div className="day-container">
      <div className="weather">
        <div className="weather__dt">{dayFromDate(day.dt)}</div>
        <div className="weather__main">
          <div className="weather__column right">
            <div>
              Утро:{" "}
              <span className="bold">{tempToString(day.temp_morn)}&#176;</span>
            </div>
            <div>
              День:{" "}
              <span className="bold">{tempToString(day.temp_day)}&#176;</span>
            </div>
            <div>
              Вечер:{" "}
              <span className="bold">{tempToString(day.temp_eve)}&#176;</span>
            </div>

            <div className="weather__daynight-temp">
              Ночь:{" "}
              <span className="bold">{tempToString(day.temp_night)}&#176;</span>
            </div>
          </div>
          <div className="weather__column">
            <WeatherIcon iconName={day.icon} />
            <div className="weather__description">{day.weather}</div>
          </div>
        </div>
        <div className="weather__bar">
          <div>
            <WiHumidity /> {day.humidity}%
          </div>
          <div>
            <WiBarometer /> {convertPressure(day.pressure)} мм рт.ст.
          </div>
        </div>
        <div className="weather__bar">
          <div className="weather__group">
            <RiWindyLine />
            <div className="weather__column left">
              <div>Скорость - {day.wind_speed.toFixed(0)} м/с</div>
              <div>Порывы - {day.wind_gust?.toFixed(1)} м/с</div>
            </div>
          </div>
          <div className="weather__column">
            <WiWindDeg style={{ transform: `rotate(${day.wind_deg}deg)` }} />
            {day.wind_string}
          </div>
        </div>
        <div className="weather__bar">
          <div className="weather__group">
            <BsSunrise /> {timeFromDate(day.sunrise)}
          </div>
          <div className="weather__group">
            <BsSunset /> {timeFromDate(day.sunset)}
          </div>
        </div>
        <div className="weather__bar">
          <div className="weather__group">
            <WiMoonrise /> {timeFromDate(day.moonrise)}
          </div>
          <div className="weather__moonphase">
            <MoonPhase phase={day.moonphase} />
          </div>
          <div className="weather__group">
            <WiMoonset /> {timeFromDate(day.moonset)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDay;
