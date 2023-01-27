import React from "react";
import { View, StyleSheet, Modal, Image, Text, Animated } from "react-native";
import { useSelector } from "react-redux";
import colors from "../assets/colors/colors";

//

const VerifyErrorModal = () => {
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const { user } = useSelector((state) => state.auth);

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
              style={{ height: 80, width: 80 }}
            />
          </View>

          <Text style={styles.text}>
            {user.verification.length === 0
              ? "Please verify your Identity to continue"
              : "Your verification is under processing, please wait..."}
          </Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default VerifyErrorModal;

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
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  text: {
    marginVertical: 10,
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
