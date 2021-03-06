import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { updateLocation } from "../../redux/locationSlice";
import { flattenGeoData } from "../../utilities/utils";
import type { LocationGeoTree } from "../../utilities/types";
import React, { useEffect } from "react";

type DropDownProps = {
  activeSuggestionIndex: number;
  resetSearchUI: () => void;
  handleMouseOver: (e: number) => void;
};

const DropDown = ({
  activeSuggestionIndex,
  resetSearchUI,
  handleMouseOver,
}: DropDownProps) => {
  const classNames = require("classnames");
  const suggestionsStatus = useAppSelector((state) => state.suggestions.status);
  const error = useAppSelector((state) => state.suggestions.error);
  const suggestions = useAppSelector((state) => state.suggestions.value);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSuggestionClick = (location: LocationGeoTree): void => {
    let flatLocation = flattenGeoData(location);
    dispatch(updateLocation(flatLocation));
    resetSearchUI();
    navigate("/");
  };

  if (suggestionsStatus === "loading") {
    return <div className="dropdown__spinner">Loading...</div>;
  }
  if (error) {
    return <div className="dropdown__error">{error}</div>;
  }
  if (suggestions?.length) {
    const renderedSuggestions = suggestions
      .slice(0, 5)
      .map((suggestion, index) => {
        let suggestionClass = classNames({
          dropdown__suggestion: true,
          "dropdown__suggestion--active": index === activeSuggestionIndex,
        });

        const shortenedSuggestion =
          suggestion.value[0][0] +
          "." +
          suggestion.value.split(" ").slice(1).join(" ");

        return (
          <li
            key={suggestion.value}
            className={suggestionClass}
            onClick={() => handleSuggestionClick(suggestions[index])}
            onMouseOver={() => handleMouseOver(index)}
          >
            {shortenedSuggestion}
          </li>
        );
      });
    return <ul className="dropdown__list">{renderedSuggestions}</ul>;
  }

  return <div className="dropdown__empty">???????????? ???? ??????????????</div>;
};

export default DropDown;
