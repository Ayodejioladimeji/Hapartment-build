import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  address: "",
  property_type: "",
  country: "",
  state: "",
  city: "",
  statename: "",
  cityname: "",
  bedrooms: "",
  bathrooms: "",
  toilets: "",
  furnishing: "",
  home_facilities: [],
  area_facilities: [],
  category: "",
  price: "",
  description: "",
  video: "",
  imageOne: null,
  imageTwo: null,
  imageThree: null,
  imageFour: null,
  imageFive: null,
  imageSix: null,
  imageSeven: null,
  listing_callback: false,
  isEdit: false,
  deleteId: "",
  updateId: "",
  publicId: [],
};

//

const listingReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GLOBALTYPES.RESET_LISTING:
      return initialState;

    case GLOBALTYPES.ADDRESS:
      return {
        ...state,
        address: payload,
      };

    case GLOBALTYPES.PROPERTY_TYPE:
      return {
        ...state,
        property_type: payload,
      };

    case GLOBALTYPES.COUNTRY:
      return {
        ...state,
        country: payload,
      };

    case GLOBALTYPES.STATE:
      return {
        ...state,
        state: payload,
      };

    case GLOBALTYPES.CITY:
      return {
        ...state,
        city: payload,
      };

    case GLOBALTYPES.STATE_NAME:
      return {
        ...state,
        statename: payload,
      };

    case GLOBALTYPES.CITY_NAME:
      return {
        ...state,
        cityname: payload,
      };

    case GLOBALTYPES.BEDROOMS:
      return {
        ...state,
        bedrooms: payload,
      };

    case GLOBALTYPES.BATHROOMS:
      return {
        ...state,
        bathrooms: payload,
      };

    case GLOBALTYPES.TOILETS:
      return {
        ...state,
        toilets: payload,
      };

    case GLOBALTYPES.FURNISHING:
      return {
        ...state,
        furnishing: payload,
      };

    case GLOBALTYPES.HOME_FACILITIES:
      return {
        ...state,
        home_facilities: payload,
      };

    case GLOBALTYPES.AREA_FACILITIES:
      return {
        ...state,
        area_facilities: payload,
      };

    case GLOBALTYPES.CATEGORY:
      return {
        ...state,
        category: payload,
      };

    case GLOBALTYPES.PRICE:
      return {
        ...state,
        price: payload,
      };

    case GLOBALTYPES.DESCRIPTION:
      return {
        ...state,
        description: payload,
      };

    case GLOBALTYPES.VIDEO:
      return {
        ...state,
        video: payload,
      };

    case GLOBALTYPES.LISTING_CALLBACK:
      return {
        ...state,
        listing_callback: payload,
      };

    case GLOBALTYPES.IMAGE_ONE:
      return {
        ...state,
        imageOne: payload,
      };

    case GLOBALTYPES.IMAGE_TWO:
      return {
        ...state,
        imageTwo: payload,
      };

    case GLOBALTYPES.IMAGE_THREE:
      return {
        ...state,
        imageThree: payload,
      };

    case GLOBALTYPES.IMAGE_FOUR:
      return {
        ...state,
        imageFour: payload,
      };

    case GLOBALTYPES.IMAGE_FIVE:
      return {
        ...state,
        imageFive: payload,
      };

    case GLOBALTYPES.IMAGE_SIX:
      return {
        ...state,
        imageSix: payload,
      };

    case GLOBALTYPES.IMAGE_SEVEN:
      return {
        ...state,
        imageSeven: payload,
      };

    case GLOBALTYPES.IS_EDIT:
      return {
        ...state,
        isEdit: payload,
      };
    case GLOBALTYPES.DELETE_ID:
      return {
        ...state,
        deleteId: payload,
      };
    case GLOBALTYPES.UPDATE_ID:
      return {
        ...state,
        updateId: payload,
      };
    case GLOBALTYPES.PUBLIC_ID:
      return {
        ...state,
        publicId: payload,
      };

    default:
      return state;
  }
};

export default listingReducer;
