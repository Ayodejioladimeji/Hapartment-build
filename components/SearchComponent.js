import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
import colors from "../assets/colors/colors";
import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { searchListing } from "../redux/actions/listingAction";

//

const SearchComponent = () => {
  const navigation = useNavigation();
  const [cityname, setCityname] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();

  //

  const handleSubmit = () => {
    navigation.navigate("FilterSearchScreen");
    setCityname("");
    dispatch(searchListing(cityname));
  };

  //
  return (
    <View style={styles.searchWrapper}>
      <View
        style={[
          styles.inputWrapper,
          isFocus && { borderColor: colors.primary },
        ]}
      >
        <Feather
          style={styles.searchIcon}
          name="search"
          size={18}
          color="black"
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Enter your search & hit enter"
          value={cityname}
          onChangeText={(text) => setCityname(text)}
          onSubmitEditing={handleSubmit}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          autoComplete={Platform.OS === "web" ? "none" : "off"}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.searchFilter}
        onPress={() => navigation.navigate("FilterScreen")}
      >
        <FontAwesome name="sliders" size={23} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchComponent;

// styles
const styles = StyleSheet.create({
  // search wrappaer section ===========
  searchWrapper: {
    height: 80,
    width: "100%",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  inputWrapper: {
    flexDirection: "row",
    width: "78%",
    borderWidth: 1.5,
    borderColor: colors.textLighter,
    alignItems: "center",
    paddingLeft: 10,
    color: colors.primary,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    height: Platform.OS === "ios" ? 50 : 45,
  },
  searchIcon: {
    marginRight: 10,
    color: colors.textDark,
  },
  searchInput: {
    fontSize: Platform.OS === "ios" ? 15 : 14,
    color: colors.primary,
    textTransform: "capitalize",
    width: "85%",
    height: Platform.OS === "ios" ? 45 : 40,
  },
  searchFilter: {
    width: "20%",
    height: Platform.OS === "ios" ? 50 : 45,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
});
