import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { updateLocation } from "../../redux/locationSlice";
import { flattenGeoData } from "../../utilities/utils";
import type { LocationGeoTree } from "../../utilities/types";

const Suggestions = () => {
  const suggestionsStatus = useAppSelector((state) => state.suggestions.status);
  const error = useAppSelector((state) => state.suggestions.error);
  const suggestions = useAppSelector((state) => state.suggestions.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSuggestionClick = (suggestion: LocationGeoTree): void => {
    let flatLocation = flattenGeoData(suggestion);
    dispatch(updateLocation(flatLocation));
    navigate("/");
  };

  if (suggestionsStatus === "loading") {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!suggestions?.length) {
    return <div className="error">Нет локаций. Уточните назание места.</div>;
  }

  return (
    <ul className="suggestions-list">
      {suggestions.map((suggestion) => {
        return (
          <li
            key={suggestion.value}
            className="suggestions-list__item"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion.value}
          </li>
        );
      })}
    </ul>
  );
};

export default Suggestions;
