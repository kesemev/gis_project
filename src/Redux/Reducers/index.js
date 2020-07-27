import { combineReducers } from "redux";

const locationReducer = (state = { latitude: 0, longitude: 0 }, action) => {
  if (action.type === "UPDATE_LOCATION") {
    return { ...state, ...action.payload };
  }
  return state;
};

export default combineReducers({
  locationReducer,
});
