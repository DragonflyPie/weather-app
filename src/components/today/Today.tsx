import Current from "../current/Current";
import Hourly from "../hourly/Hourly";
import { useAppSelector } from "../../utilities/hooks";
import Spinner from "../common/Spinner";

const Today = () => {
  const status = useAppSelector((state) => state.weather.status);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "succeeded") {
    return (
      <div className="today">
        <Current />
        <Hourly />
      </div>
    );
  }

  return null;
};

export default Today;
