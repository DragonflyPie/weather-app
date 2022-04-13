import { useAppSelector } from "../../utilities/hooks";
import { dayFromDate, tempToString, timeFromDate } from "../../utilities/utils";
import { CgArrowLongDownC } from "react-icons/cg";

const Tomorrow = () => {
  const weatherData = useAppSelector((state) => state.weather.value?.daily[1]);
  const status = useAppSelector((state) => state.weather.status);

  if (status === "loading") {
    return <div className="spinner">Loading...</div>;
  }

  if (!weatherData) {
    return <div className="">Something went wrong</div>;
  }

  return (
    <div className="tomorrow">
      <div className="" key={dayFromDate(weatherData.dt)}>
        <div className="">{dayFromDate(weatherData.dt)}</div>
        <div className="">Clouds:{weatherData.clouds}%</div>
        <div className="">Osadki: {weatherData.pop}</div>
        <div className="">Влажность: {weatherData.humidity}%</div>
        <div className="">
          {weatherData.wind_string}
          <CgArrowLongDownC
            style={{
              transform: `rotate(${weatherData.wind_deg}deg)`,
            }}
          />
        </div>
        <div className="">Порывы: {weatherData.wind_gust.toFixed(1)} м/с</div>
        <div className="">Ветер: {weatherData.wind_speed.toFixed(1)} м/с</div>
        <div className="">Фаза луны: {weatherData.moonphase}м/с</div>
        <div className="">Восход: {timeFromDate(weatherData.sunrise)}</div>
        <div className="">Закат: {timeFromDate(weatherData.sunset)}</div>

        <div className="">
          Днём:
          {tempToString(weatherData.min_temp)}...
          {tempToString(weatherData.max_temp)}&#176;C
        </div>
        <div className="">
          Ночью: {tempToString(weatherData.night_temp)}&#176;C
        </div>
        <div className="">Description: {weatherData.weather}</div>
        {weatherData.rain && (
          <div className="">Rain: {weatherData.rain} mm</div>
        )}
        {weatherData.snow && (
          <div className="">Снег: {weatherData.snow} mm</div>
        )}
      </div>
    </div>
  );
};

export default Tomorrow;
