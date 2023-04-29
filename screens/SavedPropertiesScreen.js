import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchCard from "../common/SearchCard";
import colors from "../assets/colors/colors";
import GoBack from "../common/GoBack";
import Loading from "../common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import SavedCard from "../common/SavedCard";
import { getSavedProperties } from "../redux/actions/listingAction";

//

const SavedPropertiesScreen = ({ navigation }) => {
  const [data, setData] = useState("");
  const { getfavoriteloading } = useSelector((state) => state.loading);
  const { saved_properties } = useSelector((state) => state.property);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // get my saved favourites
  useEffect(() => {
    if (token !== "" && saved_properties.length === 0) {
      dispatch(getSavedProperties(token));
    }
  }, [dispatch, token]);

  let arr = [];
  saved_properties.filter((item) => {
    let savedby = item.savedBy;
    const result = { savedby, ...item.saved_favorite };
    arr.push(result);
  });

  const filteredData = arr.filter((item) => {
    return Object.values(item)
      .join(" ")
      .toLowerCase()
      .match(data.toLowerCase());
  });

  //
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <GoBack navigation={navigation} title="Saved Properties" />

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
            placeholder="Search by location or preference"
            style={styles.searchInput}
            placeholderTextColor={colors.textLight}
            placeholderStyle={{ color: colors.textDark, fontSize: 12 }}
            onChangeText={(text) => setData(text.replace(/[^a-z0-9]/gi, " "))}
            value={data}
          />
        </View>
      </View>

      {getfavoriteloading ? (
        <Loading />
      ) : (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.searchScroll}>
            {filteredData.map((item) => {
              return <SavedCard item={item} key={item._id} />;
            })}
          </View>

          {saved_properties.length === 0 && (
            <View style={styles.emptyWrapper}>
              <Image
                style={styles.emptyImage}
                source={require("../assets/images/empty.png")}
              />
              <Text style={styles.emptyText}>No saved apartment</Text>
            </View>
          )}

          {filteredData.length === 0 && saved_properties.length !== 0 && (
            <View style={styles.emptyWrapper}>
              <Image
                style={styles.emptyImage}
                source={require("../assets/images/empty.png")}
              />
              <Text style={styles.emptyText}>No data found</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default SavedPropertiesScreen;

const styles = StyleSheet.create({
  searchScreen: {
    height: 60,
    backgroundColor: "orange",
  },
  searchScroll: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    marginBottom: 30,
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
