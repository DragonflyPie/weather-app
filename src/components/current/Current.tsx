import { useAppSelector } from "../../utilities/hooks";
import { CgArrowLongDownC } from "react-icons/cg";
import {
  convertPressure,
  dayFromDate,
  tempToString,
  timeFromDate,
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
        <div className="">Время: {timeFromDate(weatherData.dt)}</div>
        <div className="">
          Температура: {tempToString(weatherData.temp)}&#176;C
        </div>
        <div className="">
          Давление: {convertPressure(weatherData.pressure)} мм рт. ст.
        </div>
        <div className="">Восход: {timeFromDate(weatherData.sunrise)}</div>
        <div className="">Закат: {timeFromDate(weatherData.sunset)}</div>
        <div className="">Видимость: {weatherData.visibility}</div>
        <div className="">
          Направление ветра:
          {weatherData.wind_string}
          <CgArrowLongDownC
            style={{ transform: `rotate(${weatherData.wind_deg}deg)` }}
          />
        </div>
        <div className="">Скорость ветра: {weatherData.wind_speed}</div>
        <div className="">Порывы ветра: {weatherData.wind_gust}</div>
        {weatherData.rain && <div className="">Дождь: {weatherData.rain}</div>}
        {weatherData.snow && <div className="">Снег: {weatherData.snow}</div>}
      </div>
    </div>
  );
};

export default Current;
