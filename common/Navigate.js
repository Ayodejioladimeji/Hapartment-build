import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import MyStatusBar from "./MyStatusBar";
import { useNavigation } from "@react-navigation/native";

//

const Navigate = ({ navigate, title }) => {
  const navigation = useNavigation();

  return (
    <View>
      <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={styles.goBack}>
        <MaterialIcons
          name="arrow-back"
          size={27}
          color={colors.white}
          onPress={() => navigation.navigate(navigate)}
        />
        <Text style={styles.goBackText}>{title}</Text>
      </View>
    </View>
  );
};

export default Navigate;

const styles = StyleSheet.create({
  goBack: {
    flexDirection: "row",
    paddingHorizontal: 15,
    height: 60,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.primary,
  },

  goBackText: {
    marginLeft: 15,
    fontWeight: "700",
    fontSize: 17,
    color: colors.white,
    // fontFamily: "//NunitoSans-Black",
  },
});
