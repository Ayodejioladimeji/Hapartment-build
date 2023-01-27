import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import colors from "../assets/colors/colors";
import { MaterialIcons } from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LandlordScreen from "../screens/LandlordScreen";
import WhoAreYou from "../screens/WhoAreYou";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const RootHome = () => {
  const { token } = useSelector((state) => state.auth);

  //
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Agents") {
            iconName = "supervisor-account";
          } else if (route.name === "Account") {
            iconName = "account-circle";
          } else if (route.name === "Settings") {
            iconName = "settings";
          }

          // You can return any component that you like here!
          return <MaterialIcons name={iconName} size={26} color={color} />;
        },
        headerStyle: {
          height: 0,
        },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: colors.white,
          height: Platform.OS === "ios" ? 100 : 70,
        },
        tabBarLabelStyle: {
          marginBottom: 10,
        },

        tabBarIconStyle: {
          marginTop: 10,
        },

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textDark,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        // options={{ tabBarBadge: 3 }}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Agents" component={LandlordScreen} />
      {token === "" ? (
        <Tab.Screen name="Account" component={WhoAreYou} />
      ) : (
        <Tab.Screen name="Account" component={ProfileScreen} />
      )}
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default RootHome;
