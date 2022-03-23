import React, { ReactElement, useEffect, useRef } from "react";

type SuggestListProps = {
  suggestions: { value: "string"; geo_center: object }[];
};

const SuggestionList = ({ suggestions }: SuggestListProps): JSX.Element => {
  const renderSuggestions: JSX.Element[] = suggestions.map((location) => {
    return (
      <li key={location.value} className="suggestion-list__element">
        {location.value}
      </li>
    );
  });

  return <ul className="suggestion-list">{renderSuggestions}</ul>;
};

export default SuggestionList;
