import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import MyStatusBar from "./MyStatusBar";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { useDispatch, useSelector } from "react-redux";

//

const ProfileGoback = ({ navigation, title }) => {
  const { profile_callback } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <View>
      <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" />

      <View style={styles.goBack}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.back}>
            <MaterialIcons name="chevron-left" size={27} color={colors.white} />
            <Text style={styles.goBackText}>{title}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            dispatch({
              type: GLOBALTYPES.PROFILE_CALLBACK,
              payload: !profile_callback,
            })
          }
        >
          <Ionicons
            name="md-reload-sharp"
            size={22}
            color={colors.white}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileGoback;

const styles = StyleSheet.create({
  goBack: {
    flexDirection: "row",
    paddingHorizontal: 10,
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
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
