import { View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allListings } from "../redux/actions/listingAction";
import { allAgent } from "../redux/actions/profileAction";

const FetchApi = () => {
  const dispatch = useDispatch();
  const { listing_callback } = useSelector((state) => state.listing);
  const { refreshing } = useSelector((state) => state.notification);

  //

  // get all listings from the database
  useEffect(() => {
    dispatch(allListings());
  }, [listing_callback, refreshing]);

  // Fetch all agents
  useEffect(() => {
    dispatch(allAgent());
  }, []);

  return <View></View>;
};

export default FetchApi;
