import React, { ReactElement, useEffect, useRef } from "react";

interface LocationGeoTree {
  value: string;
  geo_center: {
    lat: string;
    lon: string;
  };
}

type ListProps = {
  suggestions: LocationGeoTree[];
  onClick: (suggestion: LocationGeoTree) => void;
  // onClick: ;
};

const SuggestionsList = ({ suggestions, onClick }: ListProps): JSX.Element => {
  // const kek = useRef<HTMLUListElement>(null);

  // useEffect(() => {
  //   if (null !== kek.current) {
  //     console.log(kek);
  //     (kek.current.children[0] as HTMLElement).focus();
  //   }
  // });

  const renderSuggestions: JSX.Element[] = suggestions.map(
    (location, index) => {
      return (
        <li
          key={location.value}
          className="suggestions-list__element"
          onClick={() => onClick(suggestions[index])}
        >
          {location.value}
        </li>
      );
    }
  );

  return (
    <ul className="search__suggestions-list suggestions-list">
      {renderSuggestions}
    </ul>
  );
};

export default SuggestionsList;
