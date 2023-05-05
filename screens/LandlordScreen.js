import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import GoBack from "../common/GoBack";
import LandlordSearch from "../components/LandlordSearch";
import Rating from "../common/Rating";
import { useSelector } from "react-redux";
import Loading from "../common/Loading";

//

const LandlordScreen = ({ navigation }) => {
  const [data, setData] = useState("");
  const { all_agents } = useSelector((state) => state.profile);
  const { allagentloading } = useSelector((state) => state.loading);

  const filteredData = all_agents.filter((item) => {
    return Object.values(item)
      .join(" ")
      .toLowerCase()
      .match(data.toLowerCase());
  });

  //
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <GoBack navigation={navigation} title="Verified Agents" />

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
            placeholder="Search for landlord or agent"
            style={styles.searchInput}
            placeholderTextColor={colors.textLight}
            placeholderStyle={{ color: colors.textDark, fontSize: 12 }}
            onChangeText={(text) => setData(text.replace(/[^a-z0-9]/gi, " "))}
            value={data}
          />
        </View>
      </View>

      {allagentloading ? (
        <Loading />
      ) : (
        <ScrollView
          style={styles.landlordWrapper}
          contentInsetAdjustmentBehavior="automatic"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {filteredData
            .filter((item) => item.verification.length !== 0)
            .map((item) => {
              let id = item._id;
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={item._id}
                  onPress={() =>
                    navigation.navigate("LandlordProfileScreen", { id })
                  }
                >
                  <View style={styles.landlordBox}>
                    <View style={styles.landlordLeft}>
                      {item.image !== null ? (
                        <View style={styles.landlordImage}>
                          <Image
                            source={{ uri: item.image }}
                            style={styles.landlordImage}
                          />
                        </View>
                      ) : (
                        <Image
                          source={require("../assets/images/user.jpg")}
                          style={styles.landlordImage}
                        />
                      )}
                      <View>
                        <Text style={styles.landlordText}>{item.fullname}</Text>
                        <Text style={styles.addressText}>@{item.username}</Text>
                        <Text style={styles.addressText}>{item.email}</Text>
                      </View>
                    </View>

                    <MaterialIcons
                      name="chevron-right"
                      size={24}
                      color="black"
                      style={styles.arrow}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}

          {filteredData.length === 0 && (
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

export default LandlordScreen;

const styles = StyleSheet.create({
  landlordWrapper: {
    paddingHorizontal: 15,
    marginVertical: 5,
    marginBottom: Platform.OS === "ios" ? 100 : 70,
  },
  landlordBox: {
    borderWidth: 0.7,
    borderColor: colors.primary,
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  landlordLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  landlordImage: {
    marginRight: 10,
    height: 70,
    width: 70,
    borderWidth: 0.7,
    borderColor: colors.primary,
    borderRadius: 5,
    backgroundColor: colors.light,
  },
  landlordText: {
    color: colors.textDark,
    // fontFamily: "//NunitoSans-Bold",
    fontSize: 14,
  },
  addressText: {
    color: colors.textDark,
    // fontFamily: "//NunitoSans-Regular",
    fontSize: 12,
  },
  arrow: {
    color: colors.textDark,
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
