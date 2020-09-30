import { ADD_FILTER, REMOVE_FILTER } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_FILTER:
      // Adding filter value to matching object in filters.
      return state[action.payload.key]
        ? {
            ...state,
            [action.payload.key]: [
              ...state[action.payload.key],
              action.payload.value,
            ],
          }
        : { ...state, [action.payload.key]: [action.payload.value] };
    case REMOVE_FILTER:
      // Removing filter value from matching object in filters.
      return state[action.payload.key]
        ? {
            ...state,
            [action.payload.key]: state[action.payload.key].filter(
              (e) => e !== action.payload.value
            ),
          }
        : state;
    default:
      return state;
  }
};
