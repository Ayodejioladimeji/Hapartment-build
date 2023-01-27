import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  Text,
  Platform,
  SafeAreaView,
} from "react-native";
import colors from "../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";
const { width, height } = Dimensions.get("window");

//

const FullscreenModal = ({ full_image }) => {
  const image = [{ url: full_image }];

  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
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
          <Text
            style={styles.times}
            onPress={() =>
              dispatch({ type: GLOBALTYPES.FULL_IMAGE, payload: null })
            }
          >
            Cancel
          </Text>

          <ImageViewer
            imageUrls={image}
            renderIndicator={() => null}
            style={styles.image}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FullscreenModal;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: colors.black,
    width: "100%",
    flex: 1,
    position: "relative",
  },

  times: {
    color: colors.white,
    fontSize: 15,
    paddingTop: 30,
    alignSelf: "center",
    zIndex: 1,
    positon: "absolute",
    top: 50,
  },
});
