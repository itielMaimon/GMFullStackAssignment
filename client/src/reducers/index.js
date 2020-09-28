import { combineReducers } from "redux";
import ridesReducer from "./ridesReducer";
import coordinatesReducer from "./coordinatesReducer";
import filtersReducer from "./filtersReducer";
import filterItemsReducer from "./filterItemsReducer";

export default combineReducers({
  items: ridesReducer,
  filters: filtersReducer,
  filteredItems: filterItemsReducer,
  coordinates: coordinatesReducer,
});
