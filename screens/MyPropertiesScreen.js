import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import SearchCard from "../common/SearchCard";
import colors from "../assets/colors/colors";
import GoBack from "../common/GoBack";
import { myListings } from "../redux/actions/listingAction";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import MyCard from "../common/MyCard";

//

const MyPropertiesScreen = ({ navigation }) => {
  const [data, setData] = useState("");
  const { my_listings } = useSelector((state) => state.property);
  const { mylistingloading } = useSelector((state) => state.loading);

  //

  const filteredData = my_listings.filter((item) => {
    return Object.values(item)
      .join(" ")
      .toLowerCase()
      .match(data.toLowerCase());
  });

  //
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <GoBack navigation={navigation} title="My Properties" />

      {/* The search component */}
      <View style={styles.searchWrapper}>
        <View style={styles.inputWrapper}>
          <Feather
            style={styles.searchIcon}
            name="search"
            size={18}
            color="black"
          />
          <TextInput
            placeholder="Search for property"
            style={styles.searchInput}
            placeholderTextColor={colors.textLight}
            placeholderStyle={{ color: colors.textDark, fontSize: 12 }}
            onChangeText={(text) => setData(text.replace(/[^a-z0-9]/gi, " "))}
            value={data}
          />
        </View>
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {mylistingloading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <View style={styles.searchScroll}>
            {filteredData.map((data) => {
              return <MyCard item={data} key={data._id} />;
            })}
          </View>
        )}

        {my_listings.length === 0 && (
          <View style={styles.emptyWrapper}>
            <Image
              style={styles.emptyImage}
              source={require("../assets/images/empty.png")}
            />
            <Text style={styles.emptyText}>
              You haven't created any listings
            </Text>
          </View>
        )}

        {filteredData.length === 0 && my_listings.length !== 0 && (
          <View style={styles.emptyWrapper}>
            <Image
              style={styles.emptyImage}
              source={require("../assets/images/empty.png")}
            />
            <Text style={styles.emptyText}>No data found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MyPropertiesScreen;

const styles = StyleSheet.create({
  searchScreen: {
    height: 60,
    backgroundColor: "orange",
  },
  searchScroll: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    marginBottom: 80,
  },
  searchText: {
    marginLeft: 15,
    fontWeight: "700",
    fontSize: 17,
    color: colors.white,
    // fontFamily: "//Lobster-Regular",
  },
  searchWrapper: {
    height: 80,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: colors.white,
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 0.3,
    borderColor: colors.textLighter,
    alignItems: "center",
    paddingLeft: 10,
    color: colors.textDark,
    height: Platform.OS === "ios" ? 50 : 45,
  },
  searchIcon: {
    marginRight: 10,
    color: colors.textDark,
  },
  searchInput: {
    fontSize: 14,
    color: colors.textDark,
    height: Platform.OS === "ios" ? 50 : 45,
    width: "85%",
  },
  emptyWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  emptyImage: {
    height: 150,
    width: 150,
  },
  emptyText: {
    color: colors.textLight,
    fontSize: 16,
  },
});
