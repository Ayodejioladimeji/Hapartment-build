import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import MyStatusBar from "../common/MyStatusBar";

//

const GoBack = ({ navigation, title }) => {
  return (
    <View>
      <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" />

      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View style={styles.goBack}>
          <View style={styles.back}>
            <MaterialIcons name="chevron-left" size={27} color={colors.white} />
            <Text style={styles.goBackText}>{title}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default GoBack;

const styles = StyleSheet.create({
  goBack: {
    flexDirection: "row",
    paddingHorizontal: 10,
    height: 60,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.primary,
  },
  back: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.primary,
  },

  goBackText: {
    fontWeight: "700",
    fontSize: 17,
    color: colors.white,
    // fontFamily: "//NunitoSans-Black",
  },
});
