import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { FontAwesome } from "@expo/vector-icons";
import {
  chooseImageOne,
  chooseImageTwo,
  chooseImageThree,
  chooseImageFour,
  chooseImageFive,
  chooseImageSix,
  chooseImageSeven,
} from "../utils/camera";
import CreateListingStatusBar from "../common/CreateListingStatusBar";

SplashScreen.preventAutoHideAsync();

//

const PropertyImages = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loadingOne, setLoadingOne] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [loadingThree, setLoadingThree] = useState(false);
  const [loadingFour, setLoadingFour] = useState(false);
  const [loadingFive, setLoadingFive] = useState(false);
  const [loadingSix, setLoadingSix] = useState(false);
  const [loadingSeven, setLoadingSeven] = useState(false);
  const dispatch = useDispatch();

  const {
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
    imageFive,
    imageSix,
    imageSeven,
    isEdit,
  } = useSelector((state) => state.listing);

  // set data for update
  useEffect(() => {
    if (isEdit) {
      const item = route.params.item;

      dispatch({ type: GLOBALTYPES.IMAGE_ONE, payload: item.images[0].url });
      dispatch({
        type: GLOBALTYPES.IMAGE_TWO,
        payload: item.images[1].url,
      });
      dispatch({
        type: GLOBALTYPES.IMAGE_THREE,
        payload: item.images[2].url,
      });
      dispatch({
        type: GLOBALTYPES.IMAGE_FOUR,
        payload: item.images[3].url,
      });
      dispatch({
        type: GLOBALTYPES.IMAGE_FIVE,
        payload: item.images[4].url,
      });
      dispatch({
        type: GLOBALTYPES.IMAGE_SIX,
        payload: item.images[5].url,
      });
      dispatch({
        type: GLOBALTYPES.IMAGE_SEVEN,
        payload: item.images[6].url,
      });
    }
  }, [isEdit]);

  // Handle submit
  const handleSubmit = () => {
    if (
      imageOne === null ||
      imageTwo === null ||
      imageThree === null ||
      imageFour === null ||
      imageFive === null ||
      imageSix === null ||
      imageSeven === null
    ) {
      Alert.alert("Choose all seven images");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      navigation.navigate("ListProperty");
      setLoading(false);
    }, 2000);
  };

  //

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <CreateListingStatusBar navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.heading}>Add Property Images</Text>
          <Text style={styles.subheading}>Select seven (7) images</Text>

          <TouchableOpacity
            onPress={() => chooseImageOne(dispatch, setLoadingOne)}
            activeOpacity={0.7}
            style={styles.selfieBox}
          >
            {loadingOne ? (
              <ActivityIndicator color={colors.primary} size="small" />
            ) : (
              <>
                {imageOne === null ? (
                  <View style={{ alignItems: "center" }}>
                    <FontAwesome
                      name="image"
                      size={24}
                      color={colors.textLighter}
                    />
                    <Text style={{ color: colors.textLight }}>
                      Add front View of the apartment
                    </Text>
                  </View>
                ) : (
                  <>
                    <Image source={{ uri: imageOne }} style={styles.images} />
                    <TouchableOpacity
                      onPress={() =>
                        dispatch({ type: GLOBALTYPES.IMAGE_ONE, payload: null })
                      }
                      activeOpacity={0.7}
                      style={styles.clear}
                    >
                      <FontAwesome name="trash-o" size={20} color="red" />
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => chooseImageTwo(dispatch, setLoadingTwo)}
            activeOpacity={0.7}
            style={styles.selfieBox}
          >
            {loadingTwo ? (
              <ActivityIndicator color={colors.primary} size="small" />
            ) : (
              <>
                {imageTwo === null ? (
                  <View style={{ alignItems: "center" }}>
                    <FontAwesome
                      name="image"
                      size={24}
                      color={colors.textLighter}
                    />
                    <Text style={{ color: colors.textLight }}>Click here</Text>
                  </View>
                ) : (
                  <>
                    <Image source={{ uri: imageTwo }} style={styles.images} />
                    <TouchableOpacity
                      onPress={() =>
                        dispatch({ type: GLOBALTYPES.IMAGE_TWO, payload: null })
                      }
                      activeOpacity={0.7}
                      style={styles.clear}
                    >
                      <FontAwesome name="trash-o" size={20} color="red" />
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => chooseImageThree(dispatch, setLoadingThree)}
            activeOpacity={0.7}
            style={styles.selfieBox}
          >
            {loadingThree ? (
              <ActivityIndicator color={colors.primary} size="small" />
            ) : (
              <>
                {imageThree === null ? (
                  <View style={{ alignItems: "center" }}>
                    <FontAwesome
                      name="image"
                      size={24}
                      color={colors.textLighter}
                    />
                    <Text style={{ color: colors.textLight }}>Click here</Text>
                  </View>
                ) : (
                  <>
                    <Image source={{ uri: imageThree }} style={styles.images} />
                    <TouchableOpacity
                      onPress={() =>
                        dispatch({
                          type: GLOBALTYPES.IMAGE_THREE,
                          payload: null,
                        })
                      }
                      activeOpacity={0.7}
                      style={styles.clear}
                    >
                      <FontAwesome name="trash-o" size={20} color="red" />
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => chooseImageFour(dispatch, setLoadingFour)}
            activeOpacity={0.7}
            style={styles.selfieBox}
          >
            {loadingFour ? (
              <ActivityIndicator color={colors.primary} size="small" />
            ) : (
              <>
                {imageFour === null ? (
                  <View style={{ alignItems: "center" }}>
                    <FontAwesome
                      name="image"
                      size={24}
                      color={colors.textLighter}
                    />
                    <Text style={{ color: colors.textLight }}>Click here</Text>
                  </View>
                ) : (
                  <>
                    <Image source={{ uri: imageFour }} style={styles.images} />
                    <TouchableOpacity
                      onPress={() =>
                        dispatch({
                          type: GLOBALTYPES.IMAGE_FOUR,
                          payload: null,
                        })
                      }
                      activeOpacity={0.7}
                      style={styles.clear}
                    >
                      <FontAwesome name="trash-o" size={20} color="red" />
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => chooseImageFive(dispatch, setLoadingFive)}
            activeOpacity={0.7}
            style={styles.selfieBox}
          >
            {loadingFive ? (
              <ActivityIndicator color={colors.primary} size="small" />
            ) : (
              <>
                {imageFive === null ? (
                  <View style={{ alignItems: "center" }}>
                    <FontAwesome
                      name="image"
                      size={24}
                      color={colors.textLighter}
                    />
                    <Text style={{ color: colors.textLight }}>Click here</Text>
                  </View>
                ) : (
                  <>
                    <Image source={{ uri: imageFive }} style={styles.images} />
                    <TouchableOpacity
                      onPress={() =>
                        dispatch({
                          type: GLOBALTYPES.IMAGE_FIVE,
                          payload: null,
                        })
                      }
                      activeOpacity={0.7}
                      style={styles.clear}
                    >
                      <FontAwesome name="trash-o" size={20} color="red" />
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => chooseImageSix(dispatch, setLoadingSix)}
            activeOpacity={0.7}
            style={styles.selfieBox}
          >
            {loadingSix ? (
              <ActivityIndicator color={colors.primary} size="small" />
            ) : (
              <>
                {imageSix === null ? (
                  <View style={{ alignItems: "center" }}>
                    <FontAwesome
                      name="image"
                      size={24}
                      color={colors.textLighter}
                    />
                    <Text style={{ color: colors.textLight }}>Click here</Text>
                  </View>
                ) : (
                  <>
                    <Image source={{ uri: imageSix }} style={styles.images} />
                    <TouchableOpacity
                      onPress={() =>
                        dispatch({ type: GLOBALTYPES.IMAGE_SIX, payload: null })
                      }
                      activeOpacity={0.7}
                      style={styles.clear}
                    >
                      <FontAwesome name="trash-o" size={20} color="red" />
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => chooseImageSeven(dispatch, setLoadingSeven)}
            activeOpacity={0.7}
            style={styles.selfieBox}
          >
            {loadingSeven ? (
              <ActivityIndicator color={colors.primary} size="small" />
            ) : (
              <>
                {imageSeven === null ? (
                  <View style={{ alignItems: "center" }}>
                    <FontAwesome
                      name="image"
                      size={24}
                      color={colors.textLighter}
                    />
                    <Text style={{ color: colors.textLight }}>Click here</Text>
                  </View>
                ) : (
                  <>
                    <Image source={{ uri: imageSeven }} style={styles.images} />
                    <TouchableOpacity
                      onPress={() =>
                        dispatch({
                          type: GLOBALTYPES.IMAGE_SEVEN,
                          payload: null,
                        })
                      }
                      activeOpacity={0.7}
                      style={styles.clear}
                    >
                      <FontAwesome name="trash-o" size={20} color="red" />
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.filterButton}
            onPress={handleSubmit}
          >
            {loading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>SAVE & CONTINUE</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PropertyImages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
    paddingBotom: 140,
  },
  heading: {
    fontSize: 18,
    textTransform: "uppercase",
    alignSelf: "center",
    marginVertical: 20,
    fontWeight: "600",
  },
  subheading: {
    fontSize: 14,
    alignSelf: "center",
    marginBottom: 20,
    color: colors.textLight,
    textAlign: "center",
  },

  selectHeading: {
    marginBottom: 7,
    // fontFamily: "//NunitoSans-Regular",
    fontSize: Platform.OS === "ios" ? 15 : 14,
    marginTop: 20,
    color: colors.primary,
  },

  chooseImagesButton: {
    height: 50,
    width: 150,
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },

  selfieBox: {
    height: 200,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    flexDirection: "column",
    position: "relative",
  },
  images: {
    width: "100%",
    height: "100%",
  },
  clear: {
    position: "absolute",
    right: -15,
    top: -15,
    color: "red",
    height: 35,
    width: 35,
    borderWidth: 0.3,
    borderRadius: 50,
    borderColor: colors.textLighter,
    alignItems: "center",
    justifyContent: "center",
  },
  trash: {
    color: "red",
  },
  clearText: {
    color: colors.white,
    fontWeight: "700",
  },
  docImage: {
    width: "100%",
    height: "100%",
  },

  filterButton: {
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 30,
    justifyContent: "center",
    marginBottom: 40,
  },
  buttonText: {
    color: colors.white,
    textTransform: "uppercase",
    fontWeight: "700",
  },
});
