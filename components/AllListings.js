import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import React, { useCallback } from "react";
import Card from "../common/Card";
import colors from "../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import Cards from "../common/Cards";
import { useSelector } from "react-redux";
import Loader from "../common/Loader";
import SearchCard from "../common/SearchCard";
import Loader2 from "../common/Loader2";
// import fontsize from "../assets/fontsize/fontsize";

//

const AllListings = () => {
  const navigation = useNavigation();
  const { all_listings } = useSelector((state) => state.property);
  const { alllistingloading } = useSelector((state) => state.loading);

  const renderItem = useCallback(({ item }) => {
    return alllistingloading ? (
      <Loader2 />
    ) : (
      <SearchCard item={item} navigation={navigation} />
    );
  }, []);

  //
  return (
    <SafeAreaView>
      {all_listings.length !== 0 && all_listings.length > 1 && (
        <View style={styles.lagosWrapper}>
          {/* <Text style={styles.lagosText}>Explore more</Text> */}

          <FlatList
            data={all_listings}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AllListings;

const styles = StyleSheet.create({
  lagosWrapper: {
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  lagosText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: colors.primary,
    // fontFamily: "//NunitoSans-Bold",
  },
});
