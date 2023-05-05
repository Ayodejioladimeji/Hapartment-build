import React from "react";
import { View, StyleSheet, Modal, Animated, Platform } from "react-native";
import colors from "../assets/colors/colors";

//

const Modals = ({ children }) => {
  const scaleValue = React.useRef(new Animated.Value(0)).current;

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
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Modals;

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
    borderRadius: 5,
    elevation: 20,
  },
});
