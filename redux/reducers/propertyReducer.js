import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  my_listings: [],
  all_listings: [],
  list_details: {},
  full_image: null,
  saved_properties: [],
  callback: false,
  search_listing: [],
};

//

const propertyReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GLOBALTYPES.MY_LISTINGS:
      return {
        ...state,
        my_listings: payload,
      };

    case GLOBALTYPES.ALL_LISTINGS:
      return {
        ...state,
        all_listings: payload,
      };

    case GLOBALTYPES.LIST_DETAILS:
      return {
        ...state,
        list_details: payload,
      };

    case GLOBALTYPES.FULL_IMAGE:
      return {
        ...state,
        full_image: payload,
      };

    case GLOBALTYPES.SAVED_PROPERTIES:
      return {
        ...state,
        saved_properties: payload,
      };

    case GLOBALTYPES.CALLBACK:
      return {
        ...state,
        callback: payload,
      };

    case GLOBALTYPES.SEARCH_LISTING:
      return {
        ...state,
        search_listing: payload,
      };

    default:
      return state;
  }
};

export default propertyReducer;
