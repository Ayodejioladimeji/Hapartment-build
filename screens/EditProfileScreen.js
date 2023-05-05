import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Linking,
} from "react-native";
import colors from "../assets/colors/colors";
import * as ImagePicker from "expo-image-picker";
import GoBack from "../common/GoBack";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../redux/actions/profileAction";
import { checkImage } from "../utils/checkImage";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

//

const EditProfileScreen = ({ navigation }) => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const { profile_callback } = useSelector((state) => state.profile);
  const { profileloading, error } = useSelector((state) => state.alert);
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();

  // useEffect
  useEffect(() => {
    setFullname(user.fullname);
    setUsername(user.username);
  }, [profile_callback]);

  const pickImage = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    setLoading(false);

    if (result.canceled) {
      Alert.alert("Choose image to update profile");
      return;
    }

    const file = result.assets[0];
    const err = checkImage(file);

    if (err) {
      Alert.alert(err);
      return;
    }

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setLoading(false);
    }
  };

  // handleSubmit method
  const handleSubmit = async () => {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { profileloading: true } });

    //
    if (image === null) {
      const newData = {
        fullname,
        username,
        image: user.image,
      };

      dispatch(profile(newData, token, profile_callback));
    } else {
      let newFile = {
        uri: image,
        type: `hapartment/${image.split(".")[1]}`,
        name: `hapartment/${image.split(".")[1]}`,
      };

      // send image to cloudinary
      const data = new FormData();
      data.append("file", newFile);
      data.append("upload_preset", "hapartment");
      data.append("cloud_name", "hapartment");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/hapartment/upload",
        { method: "POST", body: data }
      );

      const upload = await res.json();

      const newData = {
        fullname,
        username,
        image: upload.secure_url,
      };

      dispatch(profile(newData, token, profile_callback));
    }
  };

  //

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <GoBack navigation={navigation} title="Edit Profile" />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileWrapper}>
          <View style={styles.profileBox}>
            <TouchableOpacity onPress={pickImage}>
              {!user.image && !image ? (
                <View style={styles.profileImage}>
                  {loading ? (
                    <ActivityIndicator
                      size="small"
                      color={colors.primary}
                      style={styles.activity}
                    />
                  ) : (
                    <View style={styles.ImageBox}>
                      <Text>Click here</Text>
                    </View>
                    // <Image
                    //   source={require("../assets/images/user.jpg")}
                    //   style={styles.Image}
                    // />
                  )}
                </View>
              ) : image ? (
                <View style={styles.profileImage}>
                  {loading ? (
                    <ActivityIndicator
                      size="small"
                      color={colors.primary}
                      style={styles.activity}
                    />
                  ) : (
                    <Image source={{ uri: image }} style={styles.Image} />
                  )}
                </View>
              ) : (
                <View style={styles.profileImage}>
                  {loading ? (
                    <ActivityIndicator
                      size="small"
                      color={colors.primary}
                      style={styles.activity}
                    />
                  ) : (
                    <Image source={{ uri: user.image }} style={styles.Image} />
                  )}
                </View>
              )}
            </TouchableOpacity>
            <Text style={styles.nameText}>{fullname}</Text>
            <Text style={styles.usernameText}>@{username}</Text>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : -900}
        >
          <View style={styles.editProfileBox}>
            <Text style={styles.inputText}>FullName</Text>
            <TextInput
              style={[
                styles.formInput,
                isFocus && { borderColor: colors.primary },
              ]}
              value={fullname}
              onChangeText={(text) => setFullname(text)}
              selectTextOnFocus={false}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              editable={!isFocus && true}
            />
          </View>

          <View style={styles.editProfileBox}>
            <Text style={styles.inputText}>Email</Text>
            <TextInput
              style={styles.formInput}
              value={user.email}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>

          <View style={styles.editProfileBox}>
            <Text style={styles.inputText}>Username</Text>
            <TextInput
              style={[
                styles.formInput,
                isFocus && { borderColor: colors.primary },
              ]}
              value={username}
              onChangeText={(text) => setUsername(text)}
              // selectTextOnFocus={false}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              editable={false}
            />
          </View>

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.profileButton}
            onPress={handleSubmit}
          >
            {profileloading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.profileButtonText}>Edit Profile</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.note}>
            Send a mail to{" "}
            <Text
              style={{ color: colors.primary }}
              onPress={() => Linking.openURL("mailto:support@hapartment.org")}
            >
              support@hapartment.org
            </Text>{" "}
            to edit your email and username
          </Text>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  profileWrapper: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 30,
  },

  profileBox: {
    width: "50%",
  },
  profileImage: {
    height: 130,
    width: 130,
    marginBottom: 10,
    borderRadius: 100,
    alignSelf: "center",
    borderWidth: 4,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  Image: {
    height: "100%",
    width: "100%",
    borderRadius: 100,
  },

  ImageBox: {
    height: "100%",
    width: "100%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  nameText: {
    // fontFamily: "//NunitoSans-Black",
    fontSize: 17,
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "600",
  },
  usernameText: {
    // fontFamily: "//NunitoSans-Bold",
    textAlign: "center",
    fontSize: 15,
    color: colors.primary,
    marginTop: 5,
    textTransform: "capitalize",
  },
  editProfileBox: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  inputText: {
    marginBottom: 5,
    fontSize: 13,

    // fontFamily: "//NunitoSans-Bold",
  },

  formInput: {
    borderWidth: 1,
    height: 50,
    padding: 10,
    borderRadius: 5,
    borderColor: colors.textLighter,
  },
  profileButton: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: colors.primary,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  profileButtonText: {
    color: colors.white,
    fontWeight: "700",
  },

  error: {
    color: colors.white,
    fontSize: Platform.OS === "ios" ? 15 : 14,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "orangered",
    fontWeight: "bold",
    width: "90%",
    textAlign: "center",
    marginTop: 30,
  },

  note: {
    marginHorizontal: 20,
    marginTop: 20,
    textAlign: "center",
    color: colors.textLight,
    lineHeight: 25,
  },
});
