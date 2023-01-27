import { View } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import GoBack from "../common/GoBack";
import Loading from "../common/Loading";
import FilterSearch from "../components/FilterSearch";

SplashScreen.preventAutoHideAsync();

//

const FilterScreen = () => {
  const navigation = useNavigation();

  //

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <GoBack navigation={navigation} title="Filter" />
      <FilterSearch />
    </View>
  );
};

export default FilterScreen;
