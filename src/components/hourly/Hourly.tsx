import { useAppSelector } from "../../utilities/hooks";
import { tempToString, userTimeFromDate } from "../../utilities/utils";
import Carousel from "react-multi-carousel";

const Hourly = () => {
  const hourlyWeather = useAppSelector((state) => state.weather.value?.hourly);

  if (!hourlyWeather) {
    return <div className="">No data</div>;
  }

  const slicedHours = hourlyWeather.slice(0, 13);
  const renderedHours = slicedHours.map((hour) => (
    <div key={userTimeFromDate(hour.dt)} className="hour">
      <div className="hour__time">{userTimeFromDate(hour.dt)}</div>
      <div className="hour__temp">{tempToString(hour.temp)}&#176;C</div>
      <div className="hour__icon">{hour.weather}</div>
      <div className="hour__wind">{hour.wind_string}</div>
      <div className="hour__precipitation">
        Осадки: {(hour.pop * 100).toFixed(0)}%
      </div>
    </div>
  ));

  return (
    <div className="hourly">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay={false}
        shouldResetAutoplay={false}
        centerMode={false}
        className=""
        containerClass="hourly__carousel"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 5,
            partialVisibilityGutter: 40,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 764,
            },
            items: 3,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={2}
        swipeable
      >
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
      </Carousel>
    </div>
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
