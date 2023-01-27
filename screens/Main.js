import { View } from "react-native";
import React from "react";
import WhoAreYou from "./WhoAreYou";
import RootHome from "../components/RootHome";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Main = () => {
  return (
    <View>
      <Stack.Screen name="WhoAreYou" component={WhoAreYou} />
      <Stack.Screen name="RootHome" component={RootHome} />
    </View>
  );
};

export default Main;
