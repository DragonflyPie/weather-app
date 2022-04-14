import { useAppSelector } from "../../utilities/hooks";
import { tempToString, userTimeFromDate } from "../../utilities/utils";
import Slider from "react-slick";

const Hourly = () => {
  const hourlyWeather = useAppSelector((state) => state.weather.value?.hourly);

  if (!hourlyWeather) {
    return <div className="">No data</div>;
  }

  const slicedHours = hourlyWeather.slice(0, 13);

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
            <div className="hour__temp">{tempToString(hour.temp)}&#176;C</div>
            <div className="hour__icon">{hour.weather}</div>
            <div className="hour__wind">{hour.wind_string}</div>
            <div className="hour__precipitation">
              Осадки: {(hour.pop * 100).toFixed(0)}%
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hourly;
