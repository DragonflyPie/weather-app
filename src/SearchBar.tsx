import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { apiKey, geoTreeKey, googleApiKey, tomTomApiKey } from "./apiKey";
import { useAppSelector } from "./hooks";
// const key = process.env.REACT_APP_API_KEY;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [suggestions, setSuggestions] = useState([] as any[]);

  let classNames = require("classnames");

  const currentLocation = useAppSelector((state) => state.location.value);

  const fetchPossibleLocations = async () => {
    console.log("fetch triggered");
    if (query.length < 2) {
      return;
    }
    try {
      const response = await fetch(
        `https://api.geotree.ru/search.php?distance_priority=100&lon=${currentLocation.lon}&lat=${currentLocation.lat}&term=${query}&types=place&level=4&fields=value,geo_center&limit=5&key=${geoTreeKey}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      if (typeof error === "string") {
        setError(error);
      } else if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      fetchPossibleLocations();
    }, 1000);
    return () => clearTimeout(delayedSearch);
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const renderedSuggestions = suggestions.map((location, index) => {
    let suggestionClass = classNames({
      seach__suggestion: true,
      "search__suggestion--active": index === activeSuggestionIndex,
    });

    return (
      <li key={location.value} className={suggestionClass}>
        {location.value}
      </li>
    );
  });

  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        value={query}
        onChange={handleChange}
        placeholder="Location..."
      />
      <div className="search__icon"></div>
      <ul className="search__suggestions-list">{renderedSuggestions}</ul>

      {/* {suggestions.length && <ul className="">{renderedSuggestions}</ul> } */}
    </div>
  );
};

export default SearchBar;
