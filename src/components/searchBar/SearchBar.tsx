import React, { useEffect, useRef, useState } from "react";
import { fetchWeatherData } from "../../redux/weatherSlice";
import { updateLocation } from "../../redux/locationSlice";
import { useAppSelector, useAppDispatch } from "../../utilities/hooks";
import { useNavigate } from "react-router-dom";
import { flattenGeoData } from "../../utilities/utils";
import DropDown from "../dropdown/DropDown";
import { fetchLocationByQuery } from "../../redux/suggestionsSlice";
import type { LocationGeoTree } from "../../utilities/types";
import { IoSearchCircleOutline } from "react-icons/io5";

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dropDownRef = useRef<HTMLDivElement>(null);

  const suggestions = useAppSelector((state) => state.suggestions.value);

  const [query, setQuery] = useState("");
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [showDropDown, setShowDropDown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const currentLocation = useAppSelector((state) => state.location.value);

  useEffect(() => {
    const handleMouseClick = (e: MouseEvent) => {
      if (!dropDownRef.current?.contains(e.target as Node))
        setShowDropDown(false);
    };
    window.addEventListener("mousedown", handleMouseClick);
    return () => {
      window.removeEventListener("mousedown", handleMouseClick);
    };
  });

  useEffect(() => {
    if (query.length < 2) {
      setShowDropDown(false);
      return;
    }
    const delayedSearch = setTimeout(() => {
      dispatch(fetchLocationByQuery(query));
    }, 500);
    return () => clearTimeout(delayedSearch);
  }, [query, dispatch]);

  useEffect(() => {
    if (currentLocation) {
      dispatch(fetchWeatherData(currentLocation));
    }
  }, [currentLocation, dispatch]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
    setShowDropDown(true);
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
          e.currentTarget.blur();
          activeSuggestionIndex === -1 || !showDropDown
            ? showSuggestions()
            : changeLocation(suggestions[activeSuggestionIndex]);
          break;
        case "Escape":
          setShowDropDown(false);
          break;
      }
    }
  };

  const resetSearchUI = (): void => {
    setQuery("");
    setShowDropDown(false);
    setActiveSuggestionIndex(-1);
  };

  const changeLocation = (location: LocationGeoTree): void => {
    let flatLocation = flattenGeoData(location);
    dispatch(updateLocation(flatLocation));
    resetSearchUI();
    navigate("/");
  };

  const showSuggestions = async (): Promise<void> => {
    await navigate("suggestions");
    await resetSearchUI();
  };

  return (
    <>
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
        <button className="search__button" onClick={showSuggestions}>
          <IoSearchCircleOutline />
        </button>
      </div>
      {showDropDown && (
        <div ref={dropDownRef} className="search__dropdown dropdown">
          <DropDown
            activeSuggestionIndex={activeSuggestionIndex}
            resetSearchUI={resetSearchUI}
          />
        </div>
      )}
    </>
  );
};

export default SearchBar;
