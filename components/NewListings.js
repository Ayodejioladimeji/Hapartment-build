import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import Card from "../common/Card";
import colors from "../assets/colors/colors";
// import fontsize from "../assets/fontsize/fontsize";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Cards from "../common/Cards";
import Loader from "../common/Loader";

//

const NewListings = () => {
  const navigation = useNavigation();
  const { all_listings } = useSelector((state) => state.property);
  const { alllistingloading } = useSelector((state) => state.loading);

  // Filter through the array to get new listings
  const newApartment = all_listings.filter(
    (item) => item.category === "New apartment"
  );

  //
  return (
    <>
      {newApartment.length !== 0 && newApartment.length > 1 && (
        <View style={styles.newWrapper}>
          <Text style={styles.newText}>New apartments</Text>

          <FlatList
            data={newApartment}
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

export default NewListings;

const styles = StyleSheet.create({
  newWrapper: {
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: colors.white,
  },
  newText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: colors.primary,
    // fontFamily: "//NunitoSans-Bold",
  },
});
