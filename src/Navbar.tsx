import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchGeoLocationByIp } from "./locationSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector((state) => state.location.value?.city);
  const region = useAppSelector((state) => state.location.value?.regionName);

  useEffect(() => {
    dispatch(fetchGeoLocationByIp());
    console.log(location);

    console.log(region);
  }, []);

  return (
    <div>
      <h1>Weather</h1>
      <div className="Location">
        My current location: {location}
        {region && `, ${region}`}
      </div>
      <SearchBar />
      <Outlet />
    </div>
  );
};

export default Navbar;
