import _ from "lodash";
import {
  FETCH_RIDES,
  FILTER_TABLE_ADD,
  FILTER_TABLE_REMOVE,
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_RIDES:
      return action.payload;
    case FILTER_TABLE_ADD:
      // Taking previously filtered items and adding new filter.
      return [
        ...action.payload.filteredItems.filter(
          (item) => item[action.payload.key] !== action.payload.value
        ),
      ];
    case FILTER_TABLE_REMOVE:
      // Taking previously filtered items, and adding items from total items in accordance with existing filters.
      const filters = action.payload.filters;
      const checkFilters = (item) => {
        var shouldAdd = true;
        _.forOwn(filters, (value, key) => {
          if (value.includes(item[key])) {
            shouldAdd = false;
          }
        });
        return shouldAdd;
      };

      return [...action.payload.filteredItems].concat(
        action.payload.items.filter(
          (item) =>
            item[action.payload.key] === action.payload.value &&
            checkFilters(item)
        )
      );
    default:
      return state;
  }
};
