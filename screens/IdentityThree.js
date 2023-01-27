import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import colors from "../assets/colors/colors";
import GoBack from "../common/GoBack";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import documentType from "../constants/documentType";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { checkImage } from "../utils/checkImage";
import { identity } from "../redux/actions/profileAction";
import IdentityVerificationModal from "../common/identityVerificationModal";

//

const IdentityThree = ({ navigation }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const { identityloading } = useSelector((state) => state.alert);
  const { token } = useSelector((state) => state.auth);

  const {
    identity_name,
    identity_mobile,
    identity_document,
    document_type,
    identity_selfie,
  } = useSelector((state) => state.verify);

  const dispatch = useDispatch();

  //Pick image from user gallery

  const pickImage = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      Alert.alert("Choose document to get verified");
      setLoading(false);
      return;
    }

    const file = result.assets[0];
    const err = checkImage(file);

    if (err) {
      Alert.alert(err);
      setLoading(false);
      return;
    }

    // console.log(result);

    if (!result.canceled) {
      dispatch({
        type: GLOBALTYPES.IDENTITY_DOCUMENT,
        payload: result.assets[0].uri,
      });
      setLoading(false);
    }
  };

  // HANDLE VERIFY AGENT
  const handleSubmit = async () => {
    // validate the input
    if (
      !identity_name ||
      !identity_mobile ||
      !identity_document ||
      !identity_selfie ||
      !document_type
    ) {
      Alert.alert("Provide all necessary information");
      return;
    }

    dispatch({ type: GLOBALTYPES.ALERT, payload: { identityloading: true } });

    let documentFile = {
      uri: identity_document,
      type: `hapartment/${identity_document.split(".")[1]}`,
      name: `hapartment/${identity_document.split(".")[1]}`,
    };

    let selfieFile = {
      uri: identity_selfie,
      type: `hapartment/${identity_selfie.split(".")[1]}`,
      name: `hapartment/${identity_selfie.split(".")[1]}`,
    };

    // send image to cloudinary
    const documentData = new FormData();
    const selfieData = new FormData();

    documentData.append("file", documentFile);
    selfieData.append("file", selfieFile);

    documentData.append("upload_preset", "hapartment");
    selfieData.append("upload_preset", "hapartment");

    documentData.append("cloud_name", "hapartment");
    selfieData.append("cloud_name", "hapartment");

    const documentRes = await fetch(
      "https://api.cloudinary.com/v1_1/hapartment/upload",
      { method: "POST", body: documentData }
    );

    const selfieRes = await fetch(
      "https://api.cloudinary.com/v1_1/hapartment/upload",
      { method: "POST", body: selfieData }
    );

    const documentUpload = await documentRes.json();
    const selfieUpload = await selfieRes.json();

    const newData = {
      identity_name,
      identity_mobile,
      identity_document: documentUpload.secure_url,
      identity_selfie: selfieUpload.secure_url,
      document_type,
    };

    dispatch(identity(newData, token));
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

          <Text style={styles.name}>
            Provide Identity document for verification
          </Text>

          <View style={styles.documentType}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={documentType}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select document type" : "..."}
              value={document_type}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                dispatch({
                  type: GLOBALTYPES.DOCUMENT_TYPE,
                  payload: item.value,
                });
                setIsFocus(false);
              }}
            />
          </View>

          <TouchableWithoutFeedback onPress={pickImage}>
            {!identity_document ? (
              <View style={styles.selfieBox}>
                {loading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <>
                    <FontAwesome5
                      name="file-download"
                      size={35}
                      color={colors.textLighter}
                    />
                    <Text style={{ color: colors.textLighter }}>
                      Click here
                    </Text>
                  </>
                )}
              </View>
            ) : (
              <View style={styles.selfieBox}>
                <Image
                  source={{ uri: identity_document }}
                  style={styles.docImage}
                />

                <TouchableWithoutFeedback
                  onPress={() =>
                    dispatch({
                      type: GLOBALTYPES.IDENTITY_DOCUMENT,
                      payload: null,
                    })
                  }
                >
                  <View style={styles.clear}>
                    <Ionicons
                      name="trash-sharp"
                      size={17}
                      style={styles.trash}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={handleSubmit}>
            <View style={styles.identityButton}>
              {identityloading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <Text style={styles.identityButtonText}>Submit for review</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default IdentityThree;

const styles = StyleSheet.create({
  containerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    padding: 10,
  },

  identityWrapper: {
    marginHorizontal: 0,
    paddingHorizontal: 20,
    paddingVertical: 30,
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

  heading: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.primary,
  },

  name: {
    color: colors.textLight,
    marginBottom: 20,
  },

  filterHeading: {
    fontSize: Platform.OS === "ios" ? 18 : 16,
    textAlign: "center",
    marginBottom: 30,
    // fontFamily: "//NunitoSans-Bold",
    color: colors.secondary,
    paddingHorizontal: 20,
  },

  selectHeading: {
    marginBottom: 7,
    fontSize: Platform.OS === "ios" ? 15 : 14,
    marginTop: 20,
    color: colors.primary,
    fontWeight: "700",
  },

  dropdown: {
    height: 55,
    borderColor: colors.textLighter,
    borderWidth: 0.3,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  selfieBox: {
    height: 150,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    flexDirection: "column",
    position: "relative",
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
  identityButton: {
    backgroundColor: colors.primary,
    height: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 30,
  },

  identityButtonText: {
    color: colors.white,
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: Platform.OS === "ios" ? 14 : 12,
  },
});
