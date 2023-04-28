import { View, Text, StyleSheet, Linking } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../assets/colors/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { useNavigation } from "@react-navigation/native";

const Suspended = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // logout user
  const logOut = () => {
    AsyncStorage.removeItem("access_token");
    dispatch({ type: GLOBALTYPES.TOKEN, payload: "" });
    dispatch({ type: GLOBALTYPES.USER, payload: {} });
    dispatch({ type: GLOBALTYPES.RESET_LISTING, payload: {} });
    navigation.navigate("RootHome");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerBox}>
        <Text style={styles.heading}>Account Suspended</Text>
        <Text style={styles.body}>
          We regret to inform you that your account has been suspended due to a
          violation of our terms of service. We apologize for any inconvenience
          or frustration this may have caused. To reactivate your account,
          please reach out to our customer support team at{" "}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("mailto:support@hapartment.org")}
          >
            support@hapartment.org
          </Text>
          . Our team will be happy to assist you in resolving the issue and
          getting your account back up and running. Please be rest assured that
          your data and information is secured during this time, and we are
          taking all necessary steps to ensure the protection of your account.
        </Text>
        <Text style={{ textAlign: "center", marginVertical: 30 }}>
          Thank you for your understanding and cooperation.
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={logOut}
        >
          <View>
            <Text style={styles.buttonText}>Go Back</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Suspended;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerBox: {
    padding: 30,
    borderWidth: 0.3,
    borderColor: colors.textLight,
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 18,
  },
  body: {
    lineHeight: 30,
    fontSize: 15,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: colors.primary,
    fontSize: 15,
  },
});
