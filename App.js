import React, { useState, useEffect, useCallback } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "./screens/Onboarding";
import RootHome from "./components/RootHome";
import EditProfileScreen from "./screens/EditProfileScreen";
import DetailsScreen from "./screens/DetailsScreen";
import LandlordProfileScreen from "./screens/LandlordProfileScreen";
import AgentDetailsScreen from "./screens/AgentDetailsScreen";
import Login from "./screens/Login";
import ForgotPassword from "./screens/ForgotPassword";
import OneTimeCode from "./screens/OneTimeCode";
import Register from "./screens/Register";
import FilterScreen from "./screens/FilterScreen";
import MyPropertiesScreen from "./screens/MyPropertiesScreen";
import SavedPropertiesScreen from "./screens/SavedPropertiesScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import NotificationScreen from "./screens/NotificationScreen";
import DataProvider from "./redux/store";
import Alert from "./common/Alert";
import ResetPassword from "./screens/ResetPassword";
import IdentityOne from "./screens/IdentityOne";
import IdentityTwo from "./screens/IdentityTwo";
import IdentityThree from "./screens/IdentityThree";
import Identity from "./screens/Identity";
import ListProperty from "./screens/ListProperty";
import BasicInformation from "./screens/BasicInformation";
import PropertyDetails from "./screens/PropertyDetails";
import Description from "./screens/Description";
import PropertyImages from "./screens/PropertyImages";
import CreateListings from "./screens/CreateListings";
import HowTo from "./screens/HowTo";
import FetchApi from "./api/FetchApi";
import NetInfo from "@react-native-community/netinfo";
import NoConnectionScreen from "./screens/NoConnectionScreen";
import ReportListing from "./screens/ReportListing";
import FilterSearchScreen from "./screens/FilterSearchScreen";
import LocationSearchScreen from "./screens/LocationSearchScreen";
import CreateNotification from "./screens/CreateNotification";
import SavedDetailsScreen from "./screens/SavedDetailsScreen";
import FaqScreen from "./screens/FaqScreen";
import TermsOfUse from "./screens/TermsOfUse";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import UpdateProperty from "./screens/UpdateProperty";
import MapScreen from "./screens/MapScreen";
const Stack = createStackNavigator();

//

function App() {
  const [showOnboard, setShowOnboard] = useState(null);
  const [connectStatus, setConnectStatus] = useState(false);

  // track user network connection
  useEffect(() => {
    const data = NetInfo.addEventListener((state) => {
      setConnectStatus(state.isConnected);
    });

    return () => {
      data();
    };
  }, [connectStatus]);

  useEffect(() => {
    const getItem = async () => {
      const onboard = await AsyncStorage.getItem("onboard");

      if (onboard === null) {
        setShowOnboard(true);
        AsyncStorage.setItem("onboard", "false");
      } else {
        setShowOnboard(false);
      }
    };
    getItem();

    AsyncStorage.clear();
  }, [showOnboard]);

  //

  return connectStatus ? (
    <>
      {showOnboard !== null && (
        <DataProvider>
          <NavigationContainer>
            <Alert />
            <FetchApi />

            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              {showOnboard && (
                <Stack.Screen name="Onboarding" component={Onboarding} />
              )}

              <Stack.Screen name="RootHome" component={RootHome} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="OneTimeCode" component={OneTimeCode} />

              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />

              <Stack.Screen
                name="EditProfileScreen"
                component={EditProfileScreen}
              />

              <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
              <Stack.Screen
                name="SavedDetailsScreen"
                component={SavedDetailsScreen}
              />
              <Stack.Screen
                name="AgentDetailsScreen"
                component={AgentDetailsScreen}
              />
              <Stack.Screen
                name="LandlordProfileScreen"
                component={LandlordProfileScreen}
              />
              <Stack.Screen name="FilterScreen" component={FilterScreen} />
              <Stack.Screen
                name="MyPropertiesScreen"
                component={MyPropertiesScreen}
              />
              <Stack.Screen
                name="SavedPropertiesScreen"
                component={SavedPropertiesScreen}
              />
              <Stack.Screen
                name="ChangePasswordScreen"
                component={ChangePasswordScreen}
              />
              <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
              />
              <Stack.Screen name="IdentityOne" component={IdentityOne} />
              <Stack.Screen name="Identity" component={Identity} />
              <Stack.Screen name="IdentityTwo" component={IdentityTwo} />
              <Stack.Screen name="IdentityThree" component={IdentityThree} />
              <Stack.Screen name="ListProperty" component={ListProperty} />
              <Stack.Screen name="UpdateProperty" component={UpdateProperty} />
              <Stack.Screen
                name="BasicInformation"
                component={BasicInformation}
              />
              <Stack.Screen
                name="PropertyDetails"
                component={PropertyDetails}
              />
              <Stack.Screen name="Description" component={Description} />
              <Stack.Screen name="PropertyImages" component={PropertyImages} />
              <Stack.Screen name="CreateListings" component={CreateListings} />
              <Stack.Screen name="HowTo" component={HowTo} />
              <Stack.Screen name="ReportListing" component={ReportListing} />
              <Stack.Screen
                name="FilterSearchScreen"
                component={FilterSearchScreen}
              />

              <Stack.Screen
                name="LocationSearchScreen"
                component={LocationSearchScreen}
              />
              <Stack.Screen
                name="CreateNotification"
                component={CreateNotification}
              />
              <Stack.Screen name="FaqScreen" component={FaqScreen} />
              <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
              <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
              <Stack.Screen name="MapScreen" component={MapScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </DataProvider>
      )}
    </>
  ) : (
    <NoConnectionScreen />
  );
}

export default App;
