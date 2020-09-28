import { FETCH_RIDES } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_RIDES:
      return action.payload;
    default:
      return state;
  }
};
