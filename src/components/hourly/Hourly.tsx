import { useAppSelector } from "../../utilities/hooks";
import { tempToString, userTimeFromDate } from "../../utilities/utils";
import Slider from "react-slick";
import WeatherIcon from "../common/WeatherIcon";

const Hourly = () => {
  const hourlyWeather = useAppSelector((state) => state.weather.value?.hourly);

  if (!hourlyWeather) {
    return <div className="">No data</div>;
  }

  const slicedHours = hourlyWeather.slice(0, 25);

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 2,
  };

  return (
    <div className="hourly">
      <Slider {...settings}>
        {slicedHours.map((hour) => (
          <div key={userTimeFromDate(hour.dt)} className="hour">
            <div className="hour__time">{userTimeFromDate(hour.dt)}</div>
            <hr className="hour__line"></hr>
            <div className="hour__column">
              <div className="hour__bar">
                <div className="hour__temp">
                  {tempToString(hour.temp)}&#176;
                </div>
                <div className="hour__icon">
                  <WeatherIcon iconName={hour.icon} />
                </div>
              </div>
              {hour.pop !== 0 && (
                <div className="hour__pop">
                  {hour.snow ? "Снег:" : "Дождь"}: {(hour.pop * 100).toFixed(0)}
                  %
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hourly;
