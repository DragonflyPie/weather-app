import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchGeoLocationByIp } from "./locationSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector((state) => state.location.value?.city);

  useEffect(() => {
    dispatch(fetchGeoLocationByIp());
    console.log(location);
  }, []);

  return (
    <div>
      <h1>Weather</h1>
      <div className="Location">My current location: {location} </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
