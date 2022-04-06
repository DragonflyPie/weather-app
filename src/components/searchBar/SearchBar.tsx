import React, { useEffect, useRef, useState } from "react";
import { fetchWeatherData } from "../../redux/weatherSlice";
import { updateLocation } from "../../redux/locationSlice";
import { useAppSelector, useAppDispatch } from "../../utilities/hooks";
import { useNavigate } from "react-router-dom";
import { flattenGeoData } from "../../utilities/utils";
import DropDown from "../dropdown/DropDown";
import { fetchLocationByQuery } from "../../redux/suggestionsSlice";
import type { LocationGeoTree } from "../../utilities/types";

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const suggestions = useAppSelector((state) => state.suggestions.value);

  const [query, setQuery] = useState("");
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const currentLocation = useAppSelector((state) => state.location.value);

  useEffect(() => {
    if (query.length < 2) {
      setShowDropdown(false);
      return;
    }
    const delayedSearch = setTimeout(() => {
      dispatch(fetchLocationByQuery(query));
    }, 500);
    return () => clearTimeout(delayedSearch);
  }, [query]);

  useEffect(() => {
    if (currentLocation) {
      dispatch(fetchWeatherData(currentLocation));
    }
  }, [currentLocation, dispatch]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
    setShowDropdown(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (suggestions?.length) {
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
            ? showSuggestions()
            : changeLocation(suggestions[activeSuggestionIndex]);
          break;
        case "Escape":
          setShowDropdown(false);
          break;
      }
    }
  };

  const resetSearchUI = (): void => {
    setQuery("");
    setShowDropdown(false);
    setActiveSuggestionIndex(-1);
  };

  const changeLocation = (location: LocationGeoTree): void => {
    let flatLocation = flattenGeoData(location);
    dispatch(updateLocation(flatLocation));
    resetSearchUI();
    navigate("/");
  };

  const showSuggestions = (): void => {
    resetSearchUI();
    navigate("suggestions");
  };

  return (
    <div className="search navbar__search">
      <input
        type="text"
        ref={inputRef}
        className="search__input"
        value={query}
        onChange={handleQueryChange}
        onKeyDown={handleKeyPress}
        placeholder="Населенный пункт..."
      />
      <div className="search__icon"></div>
      {showDropdown && (
        <div className="search__dropdown">
          <DropDown
            activeSuggestionIndex={activeSuggestionIndex}
            resetSearchUI={resetSearchUI}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
