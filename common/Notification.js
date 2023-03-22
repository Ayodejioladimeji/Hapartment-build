import { View, Text, StyleSheet, Animated } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

//

const Notification = ({ color, borderColor }) => {
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const { success, error } = useSelector((state) => state.alert);
  //   const [success, setSuccess] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // modal method
    if (success || error) {
      const toggleModal = () => {
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      };
      toggleModal();
    }

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    }, 5000);
  }, [success, error]);

  //

  return (
    <View>
      {(success || error) && (
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <View
            style={{
              borderColor: colors.primary,
              borderWidth: 1.5,
              backgroundColor: colors.white,
              textAlign: "center",
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              position: "absolute",
              bottom: 0,
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontSize: 16,
              }}
            >
              {success ? success : error}
              {/* {error} */}
            </Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default Notification;
