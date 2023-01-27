import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
  FlatList,
  Platform,
} from "react-native";
import React, { useState } from "react";
import colors from "../assets/colors/colors";
import GoBack from "../common/GoBack";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { list } from "../constants/list";

//

const IdentityTwo = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { identity_selfie } = useSelector((state) => state.verify);
  const dispatch = useDispatch();

  //

  const openCamera = async () => {
    setLoading(true);
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    // console.log(permission.granted);

    if (permissionResult.granted === false) {
      Alert.alert("You refused to allow Hapartment to access your camera");
      setLoading(false);
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (result.canceled) {
      Alert.alert("Take selfie to verify your identity");
      return;
    }

    // console.log(result);

    if (!result.canceled) {
      dispatch({
        type: GLOBALTYPES.IDENTITY_SELFIE,
        payload: result.assets[0].uri,
      });
      setLoading(false);
    }
  };

  //
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <GoBack navigation={navigation} />

      <View style={styles.containerWrapper}>
        <View style={styles.identityWrapper}>
          <Image
            source={require("../assets/brandlogo.png")}
            style={styles.brandImage}
          />

          {!identity_selfie ? (
            <TouchableWithoutFeedback onPress={openCamera}>
              <View style={styles.selfieBox}>
                {loading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <>
                    <FontAwesome5
                      name="camera-retro"
                      size={25}
                      color={colors.textLight}
                    />
                    <Text style={{ color: colors.textLighter }}>
                      Click here
                    </Text>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <View style={styles.selfieBox}>
              <Image
                source={{ uri: identity_selfie }}
                style={styles.docImage}
              />

              <TouchableWithoutFeedback
                onPress={() =>
                  dispatch({
                    type: GLOBALTYPES.IDENTITY_SELFIE,
                    payload: null,
                  })
                }
              >
                <View style={styles.clear}>
                  <Ionicons name="trash-sharp" size={17} style={styles.trash} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}

          <View style={styles.takeSelfie}>
            <Text style={styles.name}>Please take a portrait selfie</Text>
            <FlatList
              data={list}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginBottom: 10 }}>
                    <Text style={styles.listText}>{`\u29BF ${item.name}`}</Text>
                  </View>
                );
              }}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("IdentityThree")}
            >
              <View style={styles.identityButton}>
                <Text style={styles.identityButtonText}>Next</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View>
  );
};

export default IdentityTwo;

const styles = StyleSheet.create({
  containerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    padding: 10,
    marginBottom: 50,
  },

  identityWrapper: {
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
  },
  idCard: {
    color: colors.primary,
    fontSize: Platform.OS === "ios" ? 70 : 60,
    alignSelf: "center",
    marginBottom: 50,
  },

  brandImage: {
    height: 100,
    width: "37%",
    resizeMode: "contain",
    alignSelf: "center",
  },

  name: {
    color: colors.secondary,
    marginBottom: 10,
    fontWeight: "600",
    marginTop: 20,
    fontSize: Platform.OS === "ios" ? 15 : 13,
  },
  takeSelfie: {
    marginHorizontal: 20,
  },
  selfieBox: {
    height: Platform.OS === "ios" ? 200 : 170,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    width: Platform.OS === "ios" ? 200 : 170,
    alignSelf: "center",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
    marginVertical: 30,
  },

  clear: {
    position: "absolute",
    right: 0,
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
  listText: {
    fontSize: Platform.OS === "ios" ? 15 : 13,
    color: colors.textLight,
  },
  identityButton: {
    backgroundColor: colors.primary,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 20,
  },

  identityButtonText: {
    color: colors.white,
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: Platform.OS === "ios" ? 14 : 12,
  },
});
