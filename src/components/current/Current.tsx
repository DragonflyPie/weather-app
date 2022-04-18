import { useAppSelector } from "../../utilities/hooks";
import { CgArrowLongDownC } from "react-icons/cg";
import {
  convertPressure,
  dayFromDate,
  tempToString,
  timeFromDate,
  userTimeFromDate,
} from "../../utilities/utils";

const Current = () => {
  const weatherData = useAppSelector((state) => state.weather.value?.current);

  if (!weatherData) {
    return <div className="current">Nothing to show</div>;
  }

  return (
    <div className="current">
      <div className="today-grid">
        <div className="">{dayFromDate(weatherData.dt)}</div>
        <div className="">{weatherData.weather}</div>
        <div className="">Влажность: {weatherData.humidity}%</div>
        <div className="">Время: {userTimeFromDate(weatherData.dt)}</div>
        <div className="">
          Температура: {tempToString(weatherData.temp)}&#176;
        </div>
        <div className="">
          Давление: {convertPressure(weatherData.pressure)} мм рт. ст.
        </div>
        <div className="">Восход: {timeFromDate(weatherData.sunrise)}</div>
        <div className="">Закат: {timeFromDate(weatherData.sunset)}</div>
        <div className="">
          Направление ветра:
          {weatherData.wind_string}
          <CgArrowLongDownC
            style={{ transform: `rotate(${weatherData.wind_deg}deg)` }}
          />
        </div>
        <div className="">
          Скорость ветра: {weatherData.wind_speed.toFixed(1)} м/с
        </div>
        <div className="">
          Порывы ветра: {weatherData.wind_gust?.toFixed(1)} м/с
        </div>
        {weatherData.rain && (
          <div className="">Дождь: {weatherData.rain} мм</div>
        )}
        {weatherData.snow && (
          <div className="">Снег: {weatherData.snow} мм</div>
        )}
      </div>
    </div>
  );
};

export default Current;
