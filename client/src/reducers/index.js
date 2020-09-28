import { combineReducers } from "redux";
import ridesReducer from "./ridesReducer";
import filtersReducer from "./filtersReducer";
import filterItemsReducer from "./filterItemsReducer";

export default combineReducers({
  items: ridesReducer,
  filters: filtersReducer,
  filteredItems: filterItemsReducer,
});
