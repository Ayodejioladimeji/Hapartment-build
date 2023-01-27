import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";
import colors from "../assets/colors/colors";
import MyStatusBar from "../common/MyStatusBar";
import onboardData from "../constants/onboardData";

//

const Onboarding = () => {
  const navigation = useNavigation();

  // initialize font family
  const [fontsLoaded] = useFonts({
    "Lobster-Regular": require("../assets/fonts/Lobster-Regular.ttf"),
    "AlfaSlabOne-Regular": require("../assets/fonts/AlfaSlabOne-Regular.ttf"),
    "NunitoSans-Regular": require("../assets/fonts/NunitoSans-Regular.ttf"),
    "NunitoSans-Black": require("../assets/fonts/NunitoSans-Black.ttf"),
    "NunitoSans-Bold": require("../assets/fonts/NunitoSans-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
    //
  }

  //
  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const keyExtractor = (item) => item.title;

  const renderNextButton = () => {
    return (
      <View style={styles.rightTextWrapper}>
        <Text style={styles.rightText}>Next</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.doneButtonWrapper}>
        <Text style={styles.doneButtonText}>Done</Text>
      </View>
    );
  };

  const renderSkipButton = () => {
    return (
      <View style={styles.leftTextWrapper}>
        <Text style={styles.leftText}>Skip</Text>
      </View>
    );
  };

  const renderPrevButton = () => {
    return (
      <View style={styles.leftTextWrapper}>
        <Text style={styles.leftText}>Prev</Text>
      </View>
    );
  };

  const handleDone = () => {
    navigation.navigate("RootHome");
  };

  //
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.white }}
      onLayout={onLayoutRootView}
    >
      <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Image
        source={require("../assets/brandlogo.png")}
        style={styles.brandImage}
      />
      <AppIntroSlider
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={onboardData}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        renderPrevButton={renderPrevButton}
        renderSkipButton={renderSkipButton}
        showPrevButton
        onDone={handleDone}
        showSkipButton
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  brandImage: {
    height: 100,
    width: "35%",
    // marginTop: 30,
    marginHorizontal: 10,
    resizeMode: "contain",
    alignSelf: "center",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50,
    backgroundColor: colors.white,
  },
  image: {
    marginTop: 0,
    height: 300,
    width: 300,
  },
  title: {
    fontSize: Platform.OS === "ios" ? 23 : 20,
    color: colors.primary,
    textAlign: "center",
    // fontFamily: "//NunitoSans-Bold",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 15,
    color: colors.textDark,
    textAlign: "center",
    // fontFamily: "//NunitoSans-Regular",
    marginHorizontal: 50,
    lineHeight: 20,
    marginTop: 10,
  },
  dotStyle: {
    backgroundColor: colors.secondary,
  },
  activeDotStyle: {
    backgroundColor: colors.primary,
  },
  rightTextWrapper: {
    width: 40,
    height: 40,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  rightText: {
    color: colors.primary,
    fontSize: 14,
  },
  leftTextWrapper: {
    width: 40,
    height: 40,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  leftText: {
    color: colors.primary,
    fontSize: 14,
  },
  doneButtonWrapper: {
    flex: 1,
    paddingLeft: 35,
    paddingRight: 50,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: -40,
    backgroundColor: colors.primary,
  },

  doneButtonText: {
    fontSize: 14,
    textAlign: "center",
    color: colors.white,
    fontWeight: "bold",
  },
});

export default Onboarding;
