import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Card from "../common/Card";
import colors from "../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { allListings } from "../redux/actions/listingAction";
import Cards from "../common/Cards";
import Loader from "../common/Loader";

//

const AroundYou = ({ data }) => {
  const navigation = useNavigation();
  const { all_listings } = useSelector((state) => state.property);
  const { alllistingloading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  // Filter through the array to get featured content
  const recentApartment = all_listings.filter(
    (item) => item.category === "Recent apartment"
  );

  //
  return (
    <>
      {recentApartment.length !== 0 && recentApartment.length > 1 && (
        <View style={styles.aroundWrapper}>
          <Text style={styles.aroundText}>Recent Apartments</Text>

          <FlatList
            data={recentApartment}
            renderItem={({ item }) => {
              return alllistingloading ? (
                <Loader />
              ) : (
                <Cards item={item} navigation={navigation} />
              );
            }}
            keyExtractor={(item) => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </>
  );
};

export default AroundYou;

const styles = StyleSheet.create({
  aroundWrapper: {
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: colors.white,
  },
  aroundText: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
    color: colors.primary,
    // fontFamily: "//NunitoSans-Bold",
  },
});
