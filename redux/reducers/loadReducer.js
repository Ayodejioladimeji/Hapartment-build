import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {};

const loadReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GLOBALTYPES.LOADING:
      return payload;
    default:
      return state;
  }
};

export default loadReducer;
