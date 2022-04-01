import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchGeoLocationByIp } from "./locationSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector((state) => state.location.value?.city);
  const region = useAppSelector((state) => state.location.value?.regionName);

  useEffect(() => {
    dispatch(fetchGeoLocationByIp());
  }, []);

  return (
    <div>
      <div className="Location">
        {location}
        {region && `, ${region}`}
      </div>
      <SearchBar />
      <Link to="/">Сегодня</Link>
      <Link to="daily">7 дней</Link>
      <Outlet />
    </div>
  );
};

export default Navbar;
