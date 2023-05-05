import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colors from "../assets/colors/colors";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { deleteProperty } from "../redux/actions/listingAction";

const DeleteModal = () => {
  const dispatch = useDispatch();
  const { deleteListing } = useSelector((state) => state.alert);
  const { token } = useSelector((state) => state.auth);
  const { deleteId, publicId, listing_callback } = useSelector(
    (state) => state.listing
  );
  const { deleteloading } = useSelector((state) => state.loading);
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

  const cancel = () => {
    dispatch({ type: GLOBALTYPES.PUBLIC_ID, payload: [] });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { deleteListing: false },
    });
  };

  //   navigate method
  const remove = () => {
    dispatch(deleteProperty(deleteId, publicId, token, listing_callback));
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
          <Text style={styles.textHeading}>DELETE</Text>
          <Text style={styles.text}>
            Are you sure you want to delete this property?
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={cancel}
              activeOpacity={0.5}
              style={styles.cancelButton}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={remove}
              activeOpacity={0.5}
              style={styles.deleteButton}
            >
              {deleteloading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.modalDeleteText}>Delete</Text>
              )}
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
  textHeading: {
    fontSize: Platform.OS === "ios" ? 22 : 20,
    textAlign: "center",
    lineHeight: 25,
    color: "red",
  },
  text: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 17,
    textAlign: "center",
    lineHeight: 25,
    color: colors.textDark,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  modalCancelText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  modalDeleteText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});
