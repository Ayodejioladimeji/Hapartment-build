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

const DeleteModal = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { deleteListing } = useSelector((state) => state.alert);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  //
  React.useEffect(() => {
    toggleModal();
  }, [deleteListing]);

  // modal method
  const toggleModal = () => {
    if (deleteListing) {
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
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

          <Text style={styles.text}>Are you sure?</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={next}
              style={styles.cancelButton}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={next}
              style={styles.deleteButton}
            >
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default DeleteModal;

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
    marginVertical: 30,
    fontSize: 17,
    textAlign: "center",
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  cancelButton: {
    backgroundColor: colors.primary,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: "red",
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
