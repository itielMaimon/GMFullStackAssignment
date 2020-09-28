import { FETCH_COORDINATES } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_COORDINATES:
      return action.payload;
    default:
      return state;
  }
};
