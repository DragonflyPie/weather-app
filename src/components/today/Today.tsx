import Current from "../current/Current";
import Hourly from "../hourly/Hourly";
import { useAppSelector } from "../../utilities/hooks";

const Today = () => {
  const status = useAppSelector((state) => state.weather.status);

  if (status === "loading") {
    return <div className="spinner">Loading...</div>;
  }

  return (
    <div className="today">
      <Current />
      <Hourly />
    </div>
  );
};

export default Today;
