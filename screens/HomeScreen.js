import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

import colors from "../assets/colors/colors";
import MyStatusBar from "../common/MyStatusBar";
import HomepageHeader from "../components/HomepageHeader";
import SearchComponent from "../components/SearchComponent";
import SearchCard from "../common/SearchCard";
import UserApi from "../api/UserApi";
import { useSelector } from "react-redux";
import Loader2 from "../common/Loader2";
import LoadMore from "../common/LoadMore";
import NewListings from "../components/NewListings";

//

const HomeScreen = ({ navigation }) => {
  const { all_listings } = useSelector((state) => state.property);
  const { alllistingloading } = useSelector((state) => state.loading);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(10);

  // const randomData = all_listings.sort(() => Math.random() - 0.5);

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
  }

  //
  return (
    <View style={styles.homeScreenWrapper} onLayout={onLayoutRootView}>
      <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <HomepageHeader />
      <UserApi />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <SearchComponent />

        <NewListings />

        <>
          <Text style={styles.exploreText}>Explore</Text>
          {all_listings.length === 0 && !alllistingloading ? (
            <View style={styles.emptyWrapper}>
              <Image
                style={styles.emptyImage}
                source={require("../assets/images/empty.png")}
              />
              <Text style={styles.emptyText}>No data found</Text>
            </View>
          ) : (
            <>
              <View style={styles.explore}>
                {alllistingloading ? (
                  <>
                    <Loader2 />
                    <Loader2 />
                    <Loader2 />
                    <Loader2 />
                    <Loader2 />
                  </>
                ) : (
                  all_listings
                    .slice(0, visible)
                    .map((item) => <SearchCard item={item} key={item._id} />)
                )}

                {visible > all_listings.length ||
                alllistingloading ||
                all_listings.length === 0 ? (
                  ""
                ) : (
                  <LoadMore
                    loading={loading}
                    setLoading={setLoading}
                    setVisible={setVisible}
                  />
                )}
              </View>
            </>
          )}
        </>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreenWrapper: {
    backgroundColor: colors.white,
    flex: 1,
  },
  activityloading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    height: "100%",
  },
  banners: {
    height: 150,
    marginHorizontal: 15,
    marginVertical: 30,
    backgroundColor: colors.light,
  },
  bannersImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  explore: {
    marginHorizontal: 15,
    marginBottom: 100,
    marginTop: 10,
  },
  exploreText: {
    marginHorizontal: 15,
    fontSize: 15,
    color: colors.primary,
    fontWeight: "500",
  },
  emptyWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  emptyImage: {
    height: 150,
    width: 150,
  },
  emptyText: {
    color: colors.textLight,
    fontSize: 16,
  },
});
