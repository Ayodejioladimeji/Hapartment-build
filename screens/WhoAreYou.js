import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import colors from "../assets/colors/colors";
import MyStatusBar from "../common/MyStatusBar";
import { useNavigation } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

// SplashScreen.preventAutoHideAsync();
//

const WhoAreYou = () => {
  const navigation = useNavigation();

  // The states for the Agent / Tenant user type
  const [userType, setUserType] = useState("agent");
  //

  // initialize font family
  // const [fontsLoaded] = useFonts({
  //   "//Lobster-Regular": require("../assets/fonts///Lobster-Regular.ttf"),
  //   "//AlfaSlabOne-Regular": require("../assets/fonts///AlfaSlabOne-Regular.ttf"),
  //   "//NunitoSans-Regular": require("../assets/fonts///NunitoSans-Regular.ttf"),
  //   "//NunitoSans-Black": require("../assets/fonts///NunitoSans-Black.ttf"),
  //   "//NunitoSans-Bold": require("../assets/fonts///NunitoSans-Bold.ttf"),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  //

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.white }}
      // onLayout={onLayoutRootView}
    >
      <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/brandlogo.png")}
          style={styles.brandImage}
        />
      </View>

      <View style={styles.containerWrapper}>
        <Text style={styles.subHeading}>
          To get started, let us know what brings you to Hapartment
        </Text>
      </View>

      <View style={styles.container}>
        <TouchableWithoutFeedback
          style={
            userType === "agent"
              ? styles.containerButtonActive
              : styles.containerButton
          }
          onPress={() => setUserType("agent")}
        >
          <MaterialCommunityIcons
            name="home-city-outline"
            style={styles.buttonIcon}
          />
          <View style={styles.buttonBox}>
            <Text style={styles.text}>I want to publish an apartment</Text>
            <Text style={styles.subText}>Landlord / Agent</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={
            userType === "tenant"
              ? styles.containerButtonActive
              : styles.containerButton
          }
          onPress={() => setUserType("tenant")}
        >
          <FontAwesome5 name="walking" style={styles.buttonIcon} />
          <View style={styles.buttonBox}>
            <Text style={styles.text}>
              I'm looking for an apartment to rent
            </Text>
            <Text style={styles.subText}>Tenant</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableOpacity
          style={styles.continue}
          onPress={() => navigation.navigate("Register", userType)}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registeredWrapper}>
        <Text style={styles.registeredText}>
          Already registered ?{" "}
          <Text
            style={styles.colored}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default WhoAreYou;

const styles = StyleSheet.create({
  logoContainer: {
    height: 100,
    marginVertical: 10,
  },
  brandImage: {
    height: 100,
    width: "35%",
    marginHorizontal: 10,
    resizeMode: "contain",
    alignSelf: "center",
  },

  containerWrapper: {
    marginHorizontal: 20,
  },
  mainheading: {
    // fontFamily: "//AlfaSlabOne-Regular",
    fontSize: "25",
    color: colors.primary,
  },
  subHeading: {
    // fontFamily: "//NunitoSans-Bold",
    fontSize: Platform.OS === "ios" ? 17 : 15,
    color: colors.secondary,
    marginVertical: 40,
    marginBottom: 100,
  },

  container: {
    marginHorizontal: 20,
    justifyContent: "center",
  },
  containerButton: {
    backgroundColor: colors.white,
    marginBottom: 30,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 0.4,
    BorderColor: colors.textLighter,
  },
  containerButtonActive: {
    backgroundColor: colors.white,
    marginBottom: 30,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 2.5,
    borderColor: colors.primary,
  },
  buttonIcon: {
    color: colors.primary,
    fontSize: 34,
    marginRight: 20,
  },
  text: {
    color: colors.primary,
    fontSize: Platform.OS === "ios" ? 15 : 14,
    // fontFamily: "//NunitoSans-Bold",
  },
  subText: {
    color: colors.secondary,
    fontSize: 14,
    textAlign: "center",
    // fontFamily: "//NunitoSans-Regular",
  },
  registeredWrapper: {
    marginHorizontal: 20,
    justifyContent: "center",
  },
  registeredText: {
    // fontFamily: "//NunitoSans-Bold",
    fontSize: Platform.OS === "ios" ? 15 : 14,
    color: colors.secondary,
    marginTop: 10,
    alignSelf: "center",
  },
  colored: {
    color: colors.primary,
  },
  continue: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 5,
    marginBottom: 15,
  },
  continueText: {
    // fontFamily: "//NunitoSans-Bold",
    fontSize: 18,
    color: colors.white,
  },
});
