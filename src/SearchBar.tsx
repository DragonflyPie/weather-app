import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { JsxElement } from "typescript";

import { apiKey, geoTreeKey, googleApiKey, tomTomApiKey } from "./apiKey";
import { useAppSelector } from "./hooks";
import SuggestionList from "./SuggestionList";
// const key = process.env.REACT_APP_API_KEY;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([] as any[]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuggestionList, setShowSuggestionList] = useState(false);

  let classNames = require("classnames");

  const currentLocation = useAppSelector((state) => state.location.value);

  const fetchPossibleLocations: () => Promise<void> = async () => {
    console.log("fetch triggered");
    if (query.length < 2) {
      return;
    }
    try {
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
    }
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      fetchPossibleLocations();
    }, 1000);
    return () => clearTimeout(delayedSearch);
  }, [query]);

  useEffect(() => {});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
    setShowDropdown(true);
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
        activeSuggestionIndex === -1
          ? suggestPossibleOptions()
          : submitWeatherSearch(suggestions[activeSuggestionIndex]);
        break;
      case "Escape":
        setShowDropdown(false);
        break;
    }
  };

  const submitWeatherSearch = (e: object): void => {
    setShowSuggestionList(false);
    console.log(e);
  };

  const suggestPossibleOptions = (): void => {
    setShowDropdown(false);
    setShowSuggestionList(true);
  };

  const suggestionsDropDown: JSX.Element[] = suggestions
    .slice(0, 5)
    .map((location, index) => {
      let suggestionClass = classNames({
        search__suggestion: true,
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
        onKeyDown={handleKeyPress}
        placeholder="Location..."
      />
      <div className="search__icon"></div>
      {showDropdown && (
        <ul className="search__suggestions-list">{suggestionsDropDown}</ul>
      )}
      {showSuggestionList && <SuggestionList suggestions={suggestions} />}
      {/* {suggestions.length && <ul className="">{renderedSuggestions}</ul> } */}
    </div>
  );
};

export default SearchBar;
