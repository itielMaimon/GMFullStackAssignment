import {
  FETCH_RIDES,
  FETCH_COORDINATES,
  ADD_FILTER,
  REMOVE_FILTER,
  FILTER_TABLE_ADD,
  FILTER_TABLE_REMOVE,
} from "./types";

import ride from "../apis/ride";

export const fetchRides = () => async (dispatch) => {
  const response = await ride.get("/rides");

  dispatch({ type: FETCH_RIDES, payload: response.data });
};

export const fetchCoordinates = (id) => async (dispatch) => {
  const response = await ride.get(`/coordinates/${id}`);

  dispatch({ type: FETCH_COORDINATES, payload: response.data });
};

export const addFilter = (key, value) => (dispatch) => {
  dispatch({
    type: ADD_FILTER,
    payload: {
      key,
      value,
    },
  });
  dispatch(filterTableAdd(key, value));
};

export const removeFilter = (key, value) => (dispatch) => {
  dispatch({
    type: REMOVE_FILTER,
    payload: {
      key,
      value,
    },
  });
  dispatch(filterTableRemove(key, value));
};

export const filterTableAdd = (key, value) => (dispatch, getState) => {
  dispatch({
    type: FILTER_TABLE_ADD,
    payload: {
      key,
      value,
      filteredItems: getState().filteredItems,
    },
  });
};

export const filterTableRemove = (key, value) => (dispatch, getState) => {
  dispatch({
    type: FILTER_TABLE_REMOVE,
    payload: {
      key,
      value,
      filteredItems: getState().filteredItems,
      items: getState().items,
      filters: getState().filters,
    },
  });
};
