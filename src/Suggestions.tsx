import React from "react";
import { useOutletContext } from "react-router-dom";
import { LocationGeoTree } from "./types";

const Suggestions = () => {
  // const context = useOutletContext();
  const suggestions: LocationGeoTree[] = useOutletContext();
  if (suggestions.length === 0) {
    return (
      <div className="suggestions-list">
        Нет локаций. Уточните назание места.
      </div>
    );
  }
  console.log(suggestions);
  return (
    <div className="suggestions-list">
      {suggestions.map((suggestion) => {
        return (
          <div key={suggestion.value} className="suggestion">
            {suggestion.value}
          </div>
        );
      })}
      лул
    </div>
  );
};

export default Suggestions;
