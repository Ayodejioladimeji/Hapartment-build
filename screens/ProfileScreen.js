import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import colors from "../assets/colors/colors";
import GoBack from "../common/GoBack";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import VerifyErrorModal from "../common/VerifyErrorModal";
import ProfileSkeletal from "../common/skeletal_loader/ProfileSkeletal";

//

const ProfileScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const { userloading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [verify, setVerify] = useState(false);

  // list property method
  const listProperty = () => {
    if (
      user.verification.length === 0 ||
      user.verification[0].isVerified === "pending"
    ) {
      setVerify(true);

      setTimeout(() => {
        setVerify(false);
      }, 3000);
    } else {
      navigation.navigate("ListProperty");
    }
  };

  // The logout method
  const logout = () => {
    AsyncStorage.removeItem("access_token");
    dispatch({ type: GLOBALTYPES.TOKEN, payload: "" });
    dispatch({ type: GLOBALTYPES.USER, payload: {} });
    dispatch({ type: GLOBALTYPES.RESET_LISTING, payload: {} });
  };

  //
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <GoBack navigation={navigation} title="User Profile" />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileWrapper}>
          {userloading ? (
            <ProfileSkeletal />
          ) : (
            <View style={styles.profileBox}>
              {!user.image ? (
                <View style={styles.profileImage}>
                  <Image
                    source={require("../assets/images/user.jpg")}
                    style={styles.Image}
                  />
                </View>
              ) : (
                <View style={styles.profileImage}>
                  <Image source={{ uri: user.image }} style={styles.Image} />
                </View>
              )}
              <Text style={styles.nameText}>{user.fullname}</Text>
              <Text style={styles.usernameText}>@{user.username}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.profileButton}
                onPress={() => navigation.navigate("EditProfileScreen")}
              >
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.profileDetailsWrapper}>
          {user.userType === "agent" && (
            <>
              {user.verification.length === 0 && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.profileDetails}
                  onPress={() => navigation.navigate("Identity")}
                >
                  <View style={styles.profileLeft}>
                    <View style={styles.detailsBox}>
                      <MaterialIcons
                        name="verified"
                        size={20}
                        color="black"
                        style={styles.profileIcon}
                      />
                    </View>
                    <Text style={styles.detailsText}>Verify Your Identity</Text>
                  </View>

                  <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color="black"
                    style={styles.arrow}
                  />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.profileDetails}
                onPress={listProperty}
              >
                <View style={styles.profileLeft}>
                  <View style={styles.detailsBox}>
                    <MaterialIcons
                      name="notifications-off"
                      size={20}
                      color="black"
                      style={styles.profileIcon}
                    />
                  </View>
                  <Text style={styles.detailsText}>List Property</Text>
                </View>

                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color="black"
                  style={styles.arrow}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.profileDetails}
                onPress={() => navigation.navigate("MyPropertiesScreen")}
              >
                <View style={styles.profileLeft}>
                  <View style={styles.detailsBox}>
                    <MaterialIcons
                      name="house-siding"
                      size={22}
                      color="black"
                      style={styles.profileIcon}
                    />
                  </View>
                  <Text style={styles.detailsText}>My Properties</Text>
                </View>

                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color="black"
                  style={styles.arrow}
                />
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.profileDetails}
            onPress={() => navigation.navigate("SavedPropertiesScreen")}
          >
            <View style={styles.profileLeft}>
              <View style={styles.detailsBox}>
                <MaterialCommunityIcons
                  name="home-city"
                  size={16}
                  color="black"
                  style={styles.profileIcon}
                />
              </View>
              <Text style={styles.detailsText}>Saved Apartments</Text>
            </View>

            <MaterialIcons
              name="chevron-right"
              size={24}
              color="black"
              style={styles.arrow}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.profileDetails}
            onPress={() => navigation.navigate("ChangePasswordScreen")}
          >
            <View style={styles.profileLeft}>
              <View style={styles.detailsBox}>
                <Ionicons
                  name="lock-open"
                  size={18}
                  color="black"
                  style={styles.profileIcon}
                />
              </View>
              <Text style={styles.detailsText}>Change Password</Text>
            </View>

            <MaterialIcons
              name="chevron-right"
              size={24}
              color="black"
              style={styles.arrow}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.profileDetails}
            onPress={() => navigation.navigate("NotificationScreen")}
          >
            <View style={styles.profileLeft}>
              <View style={styles.detailsBox}>
                <Ionicons
                  name="notifications-off-outline"
                  size={18}
                  color="black"
                  style={styles.profileIcon}
                />
              </View>
              <Text style={styles.detailsText}>Notifications</Text>
            </View>

            <MaterialIcons
              name="chevron-right"
              size={24}
              color="black"
              style={styles.arrow}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.profileDetails}
            onPress={logout}
          >
            <View style={styles.profileLeft}>
              <View style={styles.detailsBox}>
                <FontAwesome
                  name="power-off"
                  size={16}
                  color="black"
                  style={styles.profileIcon}
                />
              </View>
              <Text style={styles.detailsText}>Logout</Text>
            </View>

            <MaterialIcons
              name="chevron-right"
              size={24}
              color="black"
              style={styles.arrow}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {verify && <VerifyErrorModal />}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileWrapper: {
    height: 280,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: colors.textLighter,
    borderBottomWidth: 0.17,
    marginHorizontal: 20,
  },

  profileBox: {
    width: "50%",
  },
  profileImage: {
    height: 100,
    width: 100,
    marginBottom: 10,
    borderRadius: 50,
    alignSelf: "center",
    borderWidth: 4,
    borderColor: colors.primary,
  },
  Image: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
    alignSelf: "center",
  },
  nameText: {
    // fontFamily: "//NunitoSans-Black",
    fontSize: 17,
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "600",
  },
  usernameText: {
    // fontFamily: "//NunitoSans-Bold",
    textAlign: "center",
    fontSize: 15,
    color: colors.primary,
    marginTop: 5,
    textTransform: "capitalize",
  },
  profileButton: {
    height: 45,
    width: 150,
    borderRadius: 40,
    backgroundColor: colors.primary,
    marginTop: 15,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    // fontFamily: "//NunitoSans-Bold",
  },
  profileDetailsWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 100,
  },
  profileDetails: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.2,
    borderColor: colors.primary,
    height: 60,
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 20,
  },

  profileLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileIcon: {
    color: colors.white,
    alignSelf: "center",
  },
  detailsText: {
    color: colors.textDark,
    fontSize: Platform.OS === "ios" ? 15 : 14,
    // fontFamily: "//NunitoSans-Bold",
  },
  detailsBox: {
    height: 30,
    width: 30,
    backgroundColor: colors.primary,
    color: colors.white,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
