import { WeatherState } from "../../redux/weatherSlice";
import { useAppSelector } from "../../utilities/hooks";
import { tempToString, timeFromDate } from "../../utilities/utils";

const Hourly = () => {
  const hourlyWeather = useAppSelector((state) => state.weather.value?.hourly);

  if (!hourlyWeather) {
    return <div className="">No data</div>;
  }

  const slicedHours = hourlyWeather.slice(0, 13);

  return (
    <ul className="hourly">
      {slicedHours.map((hour) => (
        <div key={timeFromDate(hour.dt)} className="">
          <div className="">{timeFromDate(hour.dt)}</div>
          <div className="">{tempToString(hour.temp)}&#176;C</div>
          <div className="">{hour.wind_string}</div>
          <div className="">Осадки: {hour.pop * 100}%</div>
          <div className="">{hour.weather}</div>
        </div>
      ))}
    </ul>
  );
};

export default Hourly;

// <Carousel
//   swipeable={false}
//   draggable={false}
//   showDots={true}
//   responsive={responsive}
//   ssr={true} // means to render carousel on server-side.
//   infinite={true}
//   autoPlay={false}
//   autoPlaySpeed={1000}
//   keyBoardControl={true}
//   customTransition="all .5"
//   transitionDuration={500}
//   containerClass="carousel-container"
//   removeArrowOnDeviceType={["tablet", "mobile"]}
//   // deviceType={ && this.props.deviceType}
//   dotListClass="custom-dot-list-style"
//   itemClass="carousel-item-padding-40-px"
// >
//   <div>Item 1</div>
//   <div>Item 2</div>
//   <div>Item 3</div>
//   <div>Item 4</div>
// </Carousel>

// const renderedHours = weatherData.hourly.slice(0, 13).map((hour) => (
//   <div key={timeFromDate(hour.dt)} className="">
//     <div className="">{timeFromDate(hour.dt)}</div>
//     <div className="">{hour.temp}&#176;C</div>
//     <div className="">{hour.clouds}</div>
//     <div className="">{hour.pop}</div>
//     <div className="">{hour.weather}</div>
//   </div>
// ));
