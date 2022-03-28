import React, { useEffect, useRef, useState } from "react";
import { updateLocation } from "./locationSlice";
import { fetchNow } from "./weatherSlice";
import { geoTreeKey, googleApiKey, tomTomApiKey } from "./apiKey";
import { useAppSelector, useAppDispatch } from "./hooks";
import SuggestionsList from "./SuggestionsList";
// const key = process.env.REACT_APP_API_KEY;

interface LocationGeoTree {
  value: string;
  geo_center: {
    lat: string;
    lon: string;
  };
}

interface Location {
  city: string;
  regionName: string;
  lat: string;
  lon: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([] as LocationGeoTree[]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const dispatch = useAppDispatch();

  let classNames = require("classnames");

  const inputRef = useRef<HTMLInputElement>(null);

  const currentLocation = useAppSelector((state) => state.location.value);

  const fetchPossibleLocations: () => Promise<void> = async () => {
    setSuggestions([]);
    if (query.length < 2) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.geotree.ru/search.php?distance_priority=100&lon=${currentLocation.lon}&lat=${currentLocation.lat}&term=${query}&types=place&level=4&fields=value,geo_center&limit=10&key=${geoTreeKey}`
      );
      const data = await response.json();

      setSuggestions(data);
    } catch (error) {
      if (typeof error === "string") {
        setError(error);
      } else if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      fetchPossibleLocations();
    }, 500);
    return () => clearTimeout(delayedSearch);
  }, [query]);

  useEffect(() => {
    dispatch(fetchNow(currentLocation));
  }, [currentLocation, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
    setShowDropdown(true);
  };

  const handleSuggestionClick = (location: LocationGeoTree): void => {
    let flatLocation = flattenGeoData(location);
    dispatch(updateLocation(flatLocation));
    setShowDropdown(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    switch (e.key) {
      case "ArrowDown":
        activeSuggestionIndex === 4
          ? setActiveSuggestionIndex(-1)
          : setActiveSuggestionIndex(activeSuggestionIndex + 1);
        break;
      case "ArrowUp":
        activeSuggestionIndex === -1
          ? setActiveSuggestionIndex(4)
          : setActiveSuggestionIndex(activeSuggestionIndex - 1);
        break;
      case "Enter":
        if (inputRef.current !== null) {
          inputRef.current.blur();
        }
        activeSuggestionIndex === -1 || !showDropdown
          ? suggestPossibleOptions()
          : submitWeatherSearch(suggestions[activeSuggestionIndex]);
        break;
      case "Escape":
        setShowDropdown(false);
        break;
    }
  };

  const flattenGeoData = (e: LocationGeoTree): Location => {
    let geoData: Location = {
      city: e.value.split(",")[0].split(" ")[1],
      regionName: e.value.split(",")[1],
      lat: e.geo_center.lat,
      lon: e.geo_center.lon,
    };
    return geoData;
  };

  const submitWeatherSearch = (location: LocationGeoTree): void => {
    let flatLocation = flattenGeoData(location);
    setShowSuggestionList(false);
    setShowDropdown(false);
    dispatch(updateLocation(flatLocation));
  };

  const suggestPossibleOptions = (): void => {
    setShowDropdown(false);
    setShowSuggestionList(true);
  };

  const suggestionsDropDown: JSX.Element[] | JSX.Element | null = error ? (
    <div className="">{error}</div>
  ) : loading ? (
    <div className="">LOADING...</div>
  ) : suggestions.length ? (
    suggestions.slice(0, 5).map((location, index) => {
      let suggestionClass = classNames({
        search__suggestion: true,
        "search__suggestion--active": index === activeSuggestionIndex,
      });

      return (
        <li
          key={location.value}
          className={suggestionClass}
          onClick={() => handleSuggestionClick(suggestions[index])}
        >
          {location.value}
        </li>
      );
    })
  ) : null;

  return (
    <div className="search">
      <input
        type="text"
        ref={inputRef}
        className="search__input"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Location..."
      />
      <div className="search__icon"></div>
      {showDropdown && (
        <div className="search__dropdown">
          <ul className="search__dropdown">{suggestionsDropDown}</ul>
        </div>
      )}
      {showSuggestionList && suggestions.length && (
        <SuggestionsList
          suggestions={suggestions}
          onClick={handleSuggestionClick}
        />
      )}
      {/* {suggestions.length && <ul className="">{renderedSuggestions}</ul> } */}
    </div>
  );
};

export default SearchBar;
