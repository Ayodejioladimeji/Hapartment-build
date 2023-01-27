import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
  ActivityIndicator,
} from "react-native";
import colors from "../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { useDispatch, useSelector } from "react-redux";

//

const LoginErrorModal = () => {
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const { listing_callback } = useSelector((state) => state.listing);
  const { loginerror } = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  //
  React.useEffect(() => {
    toggleModal();
  }, []);

  // modal method
  const toggleModal = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // next
  const next = () => {
    dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    navigation.navigate("Login");
  };

  //

  return (
    <Modal transparent>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/images/lock.jpg")}
              style={styles.image}
            />
          </View>

          <Text style={styles.header}>Login or Register to continue</Text>
          <Text style={styles.text}>
            Please login to have access to agent details
          </Text>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={next}
            style={styles.modalButton}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default LoginErrorModal;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  image: {
    height: Platform.OS === "ios" ? 80 : 60,
    width: Platform.OS === "ios" ? 80 : 60,
  },
  header: {
    alignSelf: "center",
    fontSize: Platform.OS === "ios" ? 22 : 17,
    color: colors.primary,
    marginTop: 20,
  },
  text: {
    marginVertical: 10,
    fontSize: Platform.OS === "ios" ? 17 : 15,
    textAlign: "center",
    lineHeight: 22,
    color: colors.textLight,
  },
  modalButton: {
    backgroundColor: colors.primary,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
    height: Platform.OS === "ios" ? 50 : 40,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
