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
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

//

const ListingSuccess = () => {
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const { listing_callback } = useSelector((state) => state.listing);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    dispatch({
      type: GLOBALTYPES.LISTING_CALLBACK,
      payload: !listing_callback,
    });

    setTimeout(() => {
      setLoading(false);
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      navigation.navigate("RootHome");
    }, 3000);
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
              source={require("../assets/images/success.png")}
              style={styles.image}
            />
          </View>

          <Text style={styles.header}>Property Created Successfully</Text>
          <Text style={styles.text}>
            Please check your email for approval status, this might take up to
            1hr
          </Text>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={next}
            style={styles.modalButton}
          >
            {loading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>Done</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ListingSuccess;

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
  },
});
