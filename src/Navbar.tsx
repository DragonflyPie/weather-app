import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchGeoLocationByIp } from "./locationSlice";
import { NavLink } from "react-router-dom";
import { WiDayFog } from "react-icons/wi";
import { LocationGeoTree } from "./types";

const Navbar = () => {
  const [suggestions, setSuggestions] = useState([] as LocationGeoTree[]);
  const dispatch = useAppDispatch();
  const location = useAppSelector((state) => state.location.value?.city);
  const region = useAppSelector((state) => state.location.value?.regionName);

  useEffect(() => {
    dispatch(fetchGeoLocationByIp());
  }, [dispatch]);

  return (
    <>
      <div className="navbar">
        <div className="navbar__flexbar">
          <WiDayFog size={40} />
          <div className="navbar__location">
            {location}
            {region && `, ${region}`}
          </div>
        </div>
        <SearchBar suggestions={suggestions} setSuggestions={setSuggestions} />
        <div className="navbar__links-bar">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__link--active" : "navbar__link"
            }
          >
            Сегодня
          </NavLink>
          <NavLink
            to="daily"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__link--active" : "navbar__link"
            }
          >
            7 дней
          </NavLink>
        </div>
      </div>
      <Outlet context={suggestions} />
    </>
  );
};

export default Navbar;
