import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import SearchCard from "../common/SearchCard";
import colors from "../assets/colors/colors";
import GoBack from "../common/GoBack";
import { useSelector } from "react-redux";
import Loading from "../common/Loading";
import Loader2 from "../common/Loader2";

//

const FilterSearchScreen = ({ navigation }) => {
  const { search_listing } = useSelector((state) => state.property);
  const { filterloading } = useSelector((state) => state.loading);
  const { token } = useSelector((state) => state.auth);
  const [data, setData] = useState("");

  const filteredData = search_listing.filter((item) => {
    return Object.values(item)
      .join(" ")
      .toLowerCase()
      .match(data.toLowerCase());
  });

  // create Notification
  const createNotification = () => {
    if (!token) {
      Alert.alert("Login to create notification");
      return;
    }

    navigation.navigate("CreateNotification");
  };

  //
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <GoBack navigation={navigation} title="Filtered Properties" />

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

      <>
        <View style={styles.searchScroll}>
          {filterloading ? (
            <>
              <Loader2 />
              <Loader2 />
              <Loader2 />
              <Loader2 />
              <Loader2 />
            </>
          ) : (
            <FlatList
              data={filteredData}
              renderItem={({ item }) => {
                return <SearchCard item={item} navigation={navigation} />;
              }}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        {search_listing.length === 0 && !filterloading && (
          <View style={styles.emptyWrapper}>
            <Image
              style={styles.emptyImage}
              source={require("../assets/images/empty.png")}
            />
            <Text style={styles.emptyText}>
              No property found for your search
            </Text>

            <Text style={styles.alert}>
              We can alert you when there is a property that match your search
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={createNotification}
              style={styles.create}
            >
              <Text style={styles.createText}>Create Notification</Text>
            </TouchableOpacity>
          </View>
        )}

        {filteredData.length === 0 &&
          search_listing.length !== 0 &&
          !filterloading && (
            <View style={styles.emptyWrapper}>
              <Image
                style={styles.emptyImage}
                source={require("../assets/images/empty.png")}
              />
              <Text style={styles.emptyText}>No data found</Text>
            </View>
          )}
      </>
    </View>
  );
};

export default FilterSearchScreen;

const styles = StyleSheet.create({
  searchScreen: {
    height: 60,
    backgroundColor: "orange",
  },
  searchScroll: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    marginBottom: 180,
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
    overflow: "hidden",
  },
  searchIcon: {
    marginRight: 10,
    color: colors.textDark,
  },
  searchInput: {
    fontSize: 14,
    color: colors.textDark,
    width: "100%",
    padding: 10,
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
  alert: {
    marginTop: 30,
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 14,
    color: colors.textDark,
    lineHeight: 30,
  },
  create: {
    marginTop: 20,
    backgroundColor: colors.primary,
    height: 45,
    width: 200,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  createText: {
    color: colors.white,
    fontWeight: "600",
  },
});
