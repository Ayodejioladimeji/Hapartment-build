import { Alert } from "react-native";
import {
  getDataApi,
  getDataApis,
  patchDataApi,
  postDataApis,
  deleteDataApi,
  patchApi,
} from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

//

// Create Listing
export const createListing =
  (data, token, listing_callback, navigation) => async (dispatch) => {
    try {
      const res = await postDataApis("/create_listing", data, token);

      Alert.alert(res.data.msg);

      dispatch({
        type: GLOBALTYPES.LISTING_CALLBACK,
        payload: !listing_callback,
      });

      // navigation.navigate("RootHome");

      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.LOADING,
          payload: { createlistingloading: false },
        });
      }, 2000);
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { listingError: error.response.data.msg },
      });

      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.LOADING,
          payload: { createlistingloading: false },
        });
      }, 3000);
    }
  };

// Update Listing
export const updateListing =
  (data, token, listing_callback) => async (dispatch) => {
    try {
      const res = await patchDataApi("/update_listing", data, token);

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.msg },
      });

      dispatch({
        type: GLOBALTYPES.LISTING_CALLBACK,
        payload: !listing_callback,
      });

      navigation.navigate("RootHome");

      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.LOADING,
          payload: { createlistingloading: false },
        });
      }, 2000);
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { listingError: error.response.data.msg },
      });

      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.LOADING,
          payload: { createlistingloading: false },
        });
      }, 3000);
    }
  };

// MY listings
export const myListings = (token) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: { mylistingloading: true },
    });

    const res = await getDataApi("/my_listing", token);

    dispatch({ type: GLOBALTYPES.MY_LISTINGS, payload: res.data });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.LOADING, payload: {} });
    }, 3000);
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    }, 3000);
  }
};

// All listings
export const allListings = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: { alllistingloading: true },
    });

    const res = await getDataApis("/all_listing");

    dispatch({ type: GLOBALTYPES.ALL_LISTINGS, payload: res.data });

    setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: { alllistingloading: false },
      });
    }, 3000);
  } catch (error) {
    // console.log(error);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });

    setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: { alllistingloading: false },
      });
    }, 3000);
  }
};

// Listing details
export const listDetails = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: { listdetailsloading: true },
    });

    const res = await getDataApis("/list_details/id");

    dispatch({ type: GLOBALTYPES.LIST_DETAILS, payload: res.data });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.LOADING, payload: {} });
    }, 3000);
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    }, 3000);
  }
};

// Save Properties
export const saveProperties = (data, token, callback) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.LOADING, payload: { favloading: true } });
    const res = await postDataApis("/save_favorite", data, token);
    Alert.alert(res.data.msg);
    dispatch({ type: GLOBALTYPES.ALERT, payload: !callback });

    dispatch({
      type: GLOBALTYPES.CALLBACK,
      payload: !callback,
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.LOADING, payload: { favloading: false } });
    }, 1000);
  } catch (error) {
    Alert.alert(error.response.data.msg);

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.LOADING, payload: { favloading: false } });
    }, 1000);
  }
};

// Get Saved Properties
export const getSavedProperties = (token) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: { getfavoriteloading: true },
    });

    const res = await getDataApi("/get_favorite", token);

    dispatch({ type: GLOBALTYPES.SAVED_PROPERTIES, payload: res.data });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.LOADING, payload: {} });
    }, 3000);
  } catch (error) {
    // console.log(error.response.data.msg);
    Alert.alert(error.response.data.msg);

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      dispatch({ type: GLOBALTYPES.LOADING, payload: {} });
    }, 3000);
  }
};

// Create Listing
export const reportListing =
  (data, token, listing_callback, setMessage) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: { reportlistingloading: true },
      });

      const res = await postDataApis("/report_listing", data, token);

      Alert.alert(res.data.msg);

      dispatch({
        type: GLOBALTYPES.LISTING_CALLBACK,
        payload: !listing_callback,
      });

      setMessage("");

      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.LOADING,
          payload: { reportlistingloading: false },
        });
      }, 1000);
    } catch (error) {
      Alert.alert(error.response.data.msg);
      setMessage("");
      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.LOADING,
          payload: { reportlistingloading: false },
        });
      }, 1000);
    }
  };

// Filter Search
export const filterListing = (data) => async (dispatch) => {
  try {
    const {
      property_type,
      statename,
      cityname,
      bathrooms,
      toilets,
      furnishing,
      min_price,
      max_price,
    } = data;

    dispatch({ type: GLOBALTYPES.LOADING, payload: { filterloading: true } });

    const res = await getDataApis(
      `/filter_listing?property_type=${property_type}&statename=${statename}&cityname=${cityname}&bathrooms=${bathrooms}&toilets=${toilets}&furnishing=${furnishing}&min_price=${min_price}&max_price=${max_price}`
    );

    dispatch({ type: GLOBALTYPES.SEARCH_LISTING, payload: res.data });

    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: { filterloading: false },
    });
  } catch (error) {
    Alert.alert(error.response.data.msg);

    setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: { filterloading: false },
      });
    }, 1000);
  }
};

// Filter Search
export const searchListing = (cityname) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.LOADING, payload: { filterloading: true } });

    const res = await getDataApis(`/search_listing/${cityname}`);

    dispatch({ type: GLOBALTYPES.SEARCH_LISTING, payload: res.data });

    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: { filterloading: false },
    });
  } catch (error) {
    Alert.alert(error.response.data.msg);

    setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: { filterloading: false },
      });
    }, 1000);
  }
};

// delete listing
export const deleteProperty =
  (id, publicId, token, listing_callback) => async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.LOADING, payload: { deleteloading: true } });

      const res = await deleteDataApi(`/delete_listing/${id}`, token);

      Alert.alert(res.data.msg);

      dispatch({
        type: GLOBALTYPES.LISTING_CALLBACK,
        payload: !listing_callback,
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { deleteListing: false },
      });

      dispatch({ type: GLOBALTYPES.PUBLIC_ID, payload: [] });
      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.LOADING,
          payload: { deleteloading: false },
        });
      }, 1000);

      // delete images
      await postDataApis("/delete_images", publicId, token);
    } catch (error) {
      Alert.alert(error.response.data.msg);

      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.LOADING,
          payload: { deleteloading: false },
        });
      }, 1000);
    }
  };

// delete Favorite
export const deleteFavorite =
  (id, publicId, token, callback) => async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.LOADING, payload: { deleteloading: true } });

      const res = await deleteDataApi(`/delete_favorite/${id}`, token);

      Alert.alert(res.data.msg);

      dispatch({
        type: GLOBALTYPES.CALLBACK,
        payload: !callback,
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { deleteFavorite: false },
      });

      dispatch({ type: GLOBALTYPES.PUBLIC_ID, payload: [] });
      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.LOADING,
          payload: { deleteloading: false },
        });
      }, 1000);

      // delete images
      await postDataApis("/delete_images", publicId, token);
    } catch (error) {
      Alert.alert(error.response.data.msg);

      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.LOADING,
          payload: { deleteloading: false },
        });
      }, 1000);
    }
  };

// acquired listing
export const acquiredListing =
  (id, token, listing_callback) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: { acquiredloading: true },
      });

      const res = await patchDataApi(`/acquired_listing/${id}`, token);

      Alert.alert(res.data.msg);

      dispatch({
        type: GLOBALTYPES.LISTING_CALLBACK,
        payload: !listing_callback,
      });

      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.LOADING,
          payload: { acquiredloading: false },
        });
      }, 1000);
    } catch (error) {
      Alert.alert(error.response.data.msg);
      console.log(error.response);

      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.LOADING,
          payload: { acquiredloading: false },
        });
      }, 1000);
    }
  };
