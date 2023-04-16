import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colors from "../assets/colors/colors";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

const Popup = ({ image, text, navigation }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    success,
    authenticate,
    forgotpasswordsuccess,
    resetpasswordsuccess,
    changepasswordsuccess,
    authenticateUser,
    createListingSuccess,
  } = useSelector((state) => state.alert);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  //
  React.useEffect(() => {
    toggleModal();

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    }, 3000);
  }, [
    authenticate,
    success,
    forgotpasswordsuccess,
    resetpasswordsuccess,
    changepasswordsuccess,
    authenticateUser,
    createListingSuccess,
  ]);

  // modal method
  const toggleModal = () => {
    if (
      success ||
      authenticate ||
      forgotpasswordsuccess ||
      resetpasswordsuccess ||
      changepasswordsuccess ||
      authenticateUser ||
      createListingSuccess
    ) {
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  //   navigate method
  const next = () => {
    setLoading(true);

    // setTimeout(() => {
    dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    if (success) {
      navigation.navigate("OneTimeCode");
    } else if (forgotpasswordsuccess) {
      navigation.navigate("ResetPassword");
    } else if (resetpasswordsuccess) {
      navigation.navigate("Login");
    } else if (authenticateUser) {
      navigation.navigate("Login");
    } else if (createListingSuccess) {
      navigation.navigate("RootHome");
    } else {
      navigation.navigate("RootHome");
    }
    // }, 3000);
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
              source={image}
              style={{ height: 80, width: 80, marginVertical: 20 }}
            />
          </View>

          <Text style={styles.text}>{text}</Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Popup;

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
    borderRadius: 10,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  text: {
    marginVertical: 30,
    fontSize: 17,
    textAlign: "center",
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: colors.primary,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  modalButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
