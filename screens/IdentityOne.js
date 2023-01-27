import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import colors from "../assets/colors/colors";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { AntDesign } from "@expo/vector-icons";
import GoBack from "../common/GoBack";

//

const IdentityOne = ({ navigation }) => {
  const { identity_name, identity_mobile } = useSelector(
    (state) => state.verify
  );
  const dispatch = useDispatch();
  const [isFocus, setIsFocus] = useState(false);
  const [mobileFocus, setMobileFocus] = useState(false);

  //
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <GoBack navigation={navigation} />

      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      > */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.containerWrapper}>
          <View style={styles.identityWrapper}>
            <Image
              source={require("../assets/brandlogo.png")}
              style={styles.brandImage}
            />

            <Text style={styles.name}>
              Provide your fullname, which must be the same as the name on your
              Identity card
            </Text>

            <Text>Full Name</Text>
            <TextInput
              style={[
                styles.formInput,
                isFocus && { borderColor: colors.primary, borderWidth: 1 },
              ]}
              value={identity_name}
              autoComplete={Platform.OS === "web" ? "none" : "off"}
              onChangeText={(text) =>
                dispatch({ type: GLOBALTYPES.IDENTITY_NAME, payload: text })
              }
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />

            <Text>Mobile No</Text>
            <TextInput
              style={[
                styles.formInput,
                mobileFocus && { borderColor: colors.primary, borderWidth: 1 },
              ]}
              value={identity_mobile}
              autoComplete={Platform.OS === "web" ? "none" : "off"}
              onChangeText={(text) =>
                dispatch({ type: GLOBALTYPES.IDENTITY_MOBILE, payload: text })
              }
              keyboardType="numeric"
              onFocus={() => setMobileFocus(true)}
              onBlur={() => setMobileFocus(false)}
            />

            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("IdentityTwo")}
            >
              <View style={styles.identityButton}>
                <Text style={styles.identityButtonText}>Next</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

export default IdentityOne;

const styles = StyleSheet.create({
  containerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    padding: 10,
  },

  identityWrapper: {
    marginVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 40,
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
  formInput: {
    borderWidth: 0.4,
    height: 50,
    padding: 10,
    borderRadius: 5,
    borderColor: colors.textLighter,
    marginBottom: 20,
    marginTop: 5,
  },
  identityButton: {
    backgroundColor: colors.primary,
    height: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  identityButtonText: {
    color: colors.white,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
