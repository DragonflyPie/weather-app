import Current from "../current/Current";
import Hourly from "../hourly/Hourly";

const Today = () => {
  return (
    <div className="today">
      <Current />
      <Hourly />
    </div>
  );
};

export default Today;
