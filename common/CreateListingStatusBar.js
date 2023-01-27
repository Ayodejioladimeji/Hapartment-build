import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import MyStatusBar from "./MyStatusBar";

//

const CreateListingStatusBar = ({ navigation, title }) => {
  return (
    <View>
      <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" />

      <View>
        <View style={styles.goBacks}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={styles.goBack}
          >
            <MaterialIcons name="chevron-left" size={27} color={colors.white} />
            <Text style={styles.goBackText}>Create Listing</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("HowTo")}
            activeOpacity={0.7}
          >
            <FontAwesome5
              name="question-circle"
              size={20}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreateListingStatusBar;

const styles = StyleSheet.create({
  goBack: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.primary,
  },

  goBacks: {
    flexDirection: "row",
    paddingHorizontal: 10,
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
  },

  goBackText: {
    marginLeft: 10,
    fontWeight: "700",
    fontSize: 17,
    color: colors.white,
    // fontFamily: "//NunitoSans-Black",
  },
});
