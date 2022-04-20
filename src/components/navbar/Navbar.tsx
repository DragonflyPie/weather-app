import { useEffect } from "react";
import SearchBar from "../searchBar/SearchBar";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { fetchGeoLocationByIp } from "../../redux/locationSlice";
import { NavLink } from "react-router-dom";
import { WiDayFog } from "react-icons/wi";
import Footer from "../footer/Footer";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector((state) => state.location.value?.city);
  const region = useAppSelector((state) => state.location.value?.regionName);

  useEffect(() => {
    dispatch(fetchGeoLocationByIp());
  }, [dispatch]);

  return (
    <>
      <div className="navbar">
        <div className="navbar__row">
          <WiDayFog size={45} />
          <div className="navbar__column">
            <div className="navbar__location">
              {location}
              {region && `, ${region}`}
            </div>
            <SearchBar />
          </div>
        </div>
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
            to="tomorrow"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__link--active" : "navbar__link"
            }
          >
            Завтра
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
      <div className="content-container">
        <div className="main">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Navbar;
