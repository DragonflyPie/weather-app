import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div className="no-match">
      <div>Здесь ничего нет ;(</div>
      <div className="">
        Вернуться на{" "}
        <Link to="/" className="no-match__link">
          главную
        </Link>
        .
      </div>
    </div>
  );
};

export default NoMatch;
