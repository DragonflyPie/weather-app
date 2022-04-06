import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { updateLocation } from "../../redux/locationSlice";
import { flattenGeoData } from "../../utilities/utils";
import type { LocationGeoTree } from "../../utilities/types";

type DropDownProps = {
  activeSuggestionIndex: number;
  resetSearchUI: () => void;
};

const DropDown = ({ activeSuggestionIndex, resetSearchUI }: DropDownProps) => {
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
    return <div className="spinner">Loading...</div>;
  }
  if (error) {
    return <div className="">{error}</div>;
  }
  if (suggestions?.length) {
    let renderedSuggestions = suggestions
      .slice(0, 5)
      .map((suggestion, index) => {
        let suggestionClass = classNames({
          search__suggestion: true,
          "search__suggestion--active": index === activeSuggestionIndex,
        });

        return (
          <li
            key={suggestion.value}
            className={suggestionClass}
            onClick={() => handleSuggestionClick(suggestions[index])}
          >
            {suggestion.value}
          </li>
        );
      });
    return <ul className="">{renderedSuggestions}</ul>;

    //   )
    // suggestions.slice(0, 5).map((location, index) => {
    //   let suggestionClass = classNames({
    //     search__suggestion: true,
    //     "search__suggestion--active": index === activeSuggestionIndex,
    //   });

    //   return (
    //     <li
    //       key={location.value}
    //       className={suggestionClass}
    //       onClick={() => handleSuggestionClick(suggestions[index])}
    //     >
    //       {location.value}
    //     </li>
    //   );
    // });
  }
  return <div className="">Ничего не найдено</div>;
};

export default DropDown;
