import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import React, { useState } from "react";
import colors from "../assets/colors/colors";
import { Feather } from "@expo/vector-icons";

//

const Search = () => {
  //
  return (
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
        />
      </View>
    </View>
  );
};

export default Search;

// styles
const styles = StyleSheet.create({
  // search wrappaer section ===========
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
  },
});
