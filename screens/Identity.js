import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import colors from "../assets/colors/colors";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import GoBack from "../common/GoBack";
import MyStatusBar from "../common/MyStatusBar";

//

const Identity = ({ navigation }) => {
  const { identity_name, identity_mobile } = useSelector(
    (state) => state.verify
  );
  const dispatch = useDispatch();

  //
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerWrapper}>
            <View style={styles.identityWrapper}>
              <Image
                source={require("../assets/brandlogo.png")}
                style={styles.brandImage}
              />

              <View style={styles.textView}>
                <Text style={styles.heading}>Verify your identity</Text>
                <Text style={styles.subheading}>
                  Please match your face with a supported document in order to
                  get verified
                </Text>
              </View>

              {/* section center */}
              <View style={styles.section}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.profileDetails}
                >
                  <View style={styles.profileLeft}>
                    <View style={styles.detailsBox}>
                      <MaterialCommunityIcons
                        name="numeric-1"
                        size={20}
                        color="black"
                        style={styles.profileIcon}
                      />
                    </View>
                    <Text style={styles.detailsText}>Fullname & Mobile</Text>
                  </View>

                  <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color="black"
                    style={styles.arrow}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.profileDetails}
                >
                  <View style={styles.profileLeft}>
                    <View style={styles.detailsBox}>
                      <MaterialCommunityIcons
                        name="numeric-2"
                        size={20}
                        color="black"
                        style={styles.profileIcon}
                      />
                    </View>
                    <Text style={styles.detailsText}>Take a selfie</Text>
                  </View>

                  <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color="black"
                    style={styles.arrow}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.profileDetails}
                >
                  <View style={styles.profileLeft}>
                    <View style={styles.detailsBox}>
                      <MaterialCommunityIcons
                        name="numeric-3"
                        size={20}
                        color="black"
                        style={styles.profileIcon}
                      />
                    </View>
                    <Text style={styles.detailsText}>Add valid document</Text>
                  </View>

                  <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color="black"
                    style={styles.arrow}
                  />
                </TouchableOpacity>
              </View>

              {/* the buttons */}

              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("RootHome")}
              >
                <View style={styles.identityBtn}>
                  <Text style={styles.identityBtnText}>Continue later</Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("IdentityOne")}
              >
                <View style={styles.identityButton}>
                  <Text style={styles.identityButtonText}>Next</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Identity;

const styles = StyleSheet.create({
  containerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    padding: 10,
  },

  identityWrapper: {
    marginVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
    width: "100%",
  },

  brandImage: {
    height: 100,
    width: "37%",
    resizeMode: "contain",
    alignSelf: "center",
  },

  heading: {
    fontSize: Platform.OS === "ios" ? 18 : 17,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.primary,
    alignSelf: "center",
  },
  subheading: {
    fontSize: Platform.OS === "ios" ? 15 : 13,
    marginBottom: 10,
    color: colors.primary,
    textAlign: "center",
    paddingHorizontal: 10,
  },

  section: {
    marginVertical: 30,
    marginTop: 40,
  },

  identityBtn: {
    borderColor: colors.primary,
    borderWidth: 0.5,
    height: Platform.OS === "ios" ? 50 : 45,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 25,
  },
  identityButton: {
    backgroundColor: colors.primary,
    height: Platform.OS === "ios" ? 50 : 45,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  identityButtonText: {
    color: colors.white,
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: Platform.OS === "ios" ? 14 : 12,
  },
  identityBtnText: {
    color: colors.primary,
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: Platform.OS === "ios" ? 14 : 13,
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
