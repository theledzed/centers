import initialCentersState from "./initialCentersState";
import { SET_STATE } from "./actionTypes";

const centersReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_STATE:
      return { ...initialCentersState, ...state, ...payload };
    default:
      return state;
  }
};

export default centersReducer;
