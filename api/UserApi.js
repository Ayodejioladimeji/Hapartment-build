import { View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { getDataApi } from "../utils/fetchData";
import { getSavedProperties, myListings } from "../redux/actions/listingAction";

const UserApi = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { profile_callback } = useSelector((state) => state.profile);
  const { listing_callback } = useSelector((state) => state.listing);
  const { callback } = useSelector((state) => state.property);

  //
  // get user
  useEffect(() => {
    if (token !== "") {
      const getData = async () => {
        try {
          dispatch({ type: GLOBALTYPES.USER_LOADING, payload: true });

          const res = await getDataApi("/user", token);

          dispatch({
            type: GLOBALTYPES.USER,
            payload: res.data,
          });

          dispatch({
            type: GLOBALTYPES.TOKEN,
            payload: token,
          });

          setTimeout(() => {
            dispatch({ type: GLOBALTYPES.USER_LOADING, payload: false });
          }, 3000);
          //
        } catch (error) {
          console.log(error);
        }
      };

      getData();
    }
  }, [token, profile_callback]);

  // get my listing
  useEffect(() => {
    if (token !== "") {
      dispatch(myListings(token));
    }
  }, [token, listing_callback]);

  // get my saved favourites
  useEffect(() => {
    if (token !== "") {
      dispatch(getSavedProperties(token));
    }
  }, [token, callback]);

  return <View></View>;
};

export default UserApi;
