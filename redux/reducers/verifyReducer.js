import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  identity_name: "",
  identity_selfie: null,
  document_type: "",
  identity_document: null,
  identity_mobile: "",
};

const verifyReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GLOBALTYPES.IDENTITY_NAME:
      return {
        ...state,
        identity_name: payload,
      };
    case GLOBALTYPES.IDENTITY_SELFIE:
      return {
        ...state,
        identity_selfie: payload,
      };
    case GLOBALTYPES.DOCUMENT_TYPE:
      return {
        ...state,
        document_type: payload,
      };
    case GLOBALTYPES.IDENTITY_DOCUMENT:
      return {
        ...state,
        identity_document: payload,
      };
    case GLOBALTYPES.IDENTITY_MOBILE:
      return {
        ...state,
        identity_mobile: payload,
      };

    case GLOBALTYPES.VERIFY:
      return payload;

    default:
      return state;
  }
};

export default verifyReducer;
