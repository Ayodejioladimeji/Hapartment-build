import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { useNavigation } from "@react-navigation/native";

//

const HomepageHeader = () => {
  const navigation = useNavigation();
  const { user, token } = useSelector((state) => state.auth);
  const { userloading } = useSelector((state) => state.alert);
  const { refreshing } = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  //
  return (
    <View style={styles.headerWrapper}>
      {token !== "" ? (
        <>
          {(!userloading && !user) || userloading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <View style={styles.headerLeft}>
              {!user.image ? (
                <Image
                  source={require("../assets/images/user.jpg")}
                  style={styles.headerImage}
                />
              ) : (
                <Image
                  source={{ uri: user.image }}
                  style={styles.headerImage}
                />
              )}
              <View style={styles.headerBox}>
                <Text style={styles.headerName}>Hi, {user.username}</Text>
                <Text style={styles.headerLocation}>{user.userType}</Text>
              </View>
            </View>
          )}
        </>
      ) : (
        <View style={styles.headerLeft}>
          <Image
            source={require("../assets/icons.png")}
            style={styles.headerImages}
          />
          <View style={styles.headerBox}>
            <Text style={styles.headerName}>Hapartment</Text>
            <Text style={styles.headerLocation}>Welcome</Text>
          </View>
        </View>
      )}

      <View style={styles.headerRight}>
        <TouchableOpacity onPress={() => navigation.navigate("FilterScreen")}>
          <View style={styles.sun}>
            <FontAwesome name="sliders" size={23} color={colors.white} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          // activeOpacity={0.7}
          onPress={() =>
            dispatch({ type: GLOBALTYPES.REFRESHING, payload: !refreshing })
          }
        >
          <View style={styles.refresh}>
            <Ionicons name="md-reload-sharp" size={22} color={colors.white} />
          </View>
        </TouchableOpacity>

        {/* <View style={styles.notify}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={22}
            color={colors.white}
          />

          <View style={styles.dots}></View>
        </View> */}
      </View>
    </View>
  );
};

export default HomepageHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: colors.primary,
    paddingVertical: 10,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    width: Platform.OS === "ios" ? 250 : 205,
  },
  headerImage: {
    borderRadius: 50,
    height: 50,
    width: 50,
    marginRight: 10,
    borderWidth: 2,
    borderColor: colors.white,
    resizeMode: "cover",
  },

  headerImages: {
    borderRadius: 50,
    height: 50,
    width: 50,
    marginRight: 10,
    resizeMode: "contain",
  },

  headerName: {
    // fontSize: fontsize.four,
    color: colors.white,
    fontWeight: "600",
    fontFamily: "AlfaSlabOne-Regular",
    textTransform: "capitalize",
    fontSize: Platform.OS == "ios" ? 15 : 14,
  },

  headerRight: {
    backgroudColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    width: 70,
    justifyContent: "space-between",
  },

  headerLocation: {
    color: colors.white,
    // fontFamily: "//Lobster-Regular",
    textTransform: "capitalize",
    fontSize: 15,
  },
  notify: {
    position: "relative",
  },
  dots: {
    position: "absolute",
    height: 10,
    width: 10,
    backgroundColor: "red",
    borderRadius: 50,
    right: 0,
  },
  sun: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  refresh: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
