import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  my_notification: [],
  refreshing: false,
};

//

const notificationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GLOBALTYPES.MY_NOTIFICATION:
      return {
        ...state,
        my_notification: payload,
      };

    case GLOBALTYPES.REFRESHING:
      return {
        ...state,
        refreshing: payload,
      };

    default:
      return state;
  }
};

export default notificationReducer;
