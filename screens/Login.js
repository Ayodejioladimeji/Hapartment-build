import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import React, { useState } from "react";
import colors from "../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import EmailValidator from "email-validator";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authAction";
import Navigate from "../common/Navigate";
import GoBack from "../common/GoBack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { A } from "@expo/html-elements";

// VALIDATION REGEX
const passwordUpper = /(?=.*[A-Z])/;
const passwordSpecial = /(?=.*[!@#$%^&*])/;
const passwordLower = /(?=.*[a-z])/;
const passwordRegex = /(?=.*[0-9])/;

//

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { authloading, error } = useSelector((state) => state.alert);
  const [typePassword, setTypePassword] = useState(false);

  //
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          const newData = {
            email: values.email.toLowerCase(),
            password: values.password,
          };
          dispatch(login(newData));
          setSubmitting(false);
        }, 500);
      }}
      //   HANDLING VALIDATION MESSAGES
      validate={(values) => {
        let errors = {};

        if (!values.email) {
          errors.email = "Email is required";
        } else if (!EmailValidator.validate(values.email)) {
          errors.email = "Invalid email address";
        }

        //   THE PASSWORD SECTION
        if (!values.password) {
          errors.password = "Password is required";
        } else if (values.password.length < 8) {
          errors.password = "Password must be 8 characters long";
        } else if (!passwordUpper.test(values.password)) {
          errors.password = "Password must contain one upperCase letter";
        } else if (!passwordLower.test(values.password)) {
          errors.password = "Password must contain one lowerCase letter";
        } else if (!passwordRegex.test(values.password)) {
          errors.password = "Password must contain one number";
        } else if (!passwordSpecial.test(values.password)) {
          errors.password = "Password must contain one special character";
        }

        return errors;
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <View style={{ flex: 1, backgroundColor: colors.white }}>
            {/* <Navigate navigate="WhoAreYou" title="Login" /> */}
            <GoBack navigation={navigation} title="Login" />

            <ScrollView>
              <View style={styles.registerContainer}>
                <Text style={styles.heading}>Login to continue</Text>

                {error && <Text style={styles.error}>{error}</Text>}

                <View stye={styles.formContainer}>
                  <View style={styles.editProfileBox}>
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Provide your email"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      name="email"
                      autoComplete={Platform.OS === "web" ? "none" : "off"}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errors}>{errors.email}</Text>
                    )}
                  </View>

                  <View style={styles.editProfileBox}>
                    <Text style={styles.inputText}>Password</Text>
                    <TextInput
                      secureTextEntry={typePassword ? false : true}
                      style={styles.formInput}
                      placeholder="**********"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      name="password"
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errors}>{errors.password}</Text>
                    )}

                    {/* password toggle */}

                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={styles.eye}
                      onPress={() => setTypePassword(!typePassword)}
                    >
                      {typePassword ? (
                        <Ionicons
                          name="eye-off-outline"
                          size={22}
                          color={colors.textLight}
                        />
                      ) : (
                        <Ionicons
                          name="eye-outline"
                          size={22}
                          color={colors.textLight}
                        />
                      )}
                    </TouchableOpacity>
                  </View>

                  <Text
                    onPress={() => navigation.navigate("ForgotPassword")}
                    style={styles.forgotPassword}
                  >
                    Forgot password ?
                  </Text>

                  <TouchableWithoutFeedback onPress={handleSubmit}>
                    <View style={styles.profileButton}>
                      {authloading ? (
                        <ActivityIndicator size="small" color={colors.white} />
                      ) : (
                        <Text style={styles.profileButtonText}>Login</Text>
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View style={styles.helpWrapper}>
                  <Text style={styles.helpHeading}>Neep Help ? Contact Us</Text>
                  <TouchableOpacity
                    style={styles.helpBox}
                    onPress={() =>
                      Linking.openURL("mailto:support@hapartment.org")
                    }
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={24}
                      color={colors.primary}
                    />
                    <Text style={styles.helpText}>support@hapartment.org</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        );
      }}
    </Formik>
  );
};

export default Login;

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 30,
  },
  heading: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    // fontFamily: "//NunitoSans-Bold",
    alignSelf: "center",
    marginBottom: 30,
    color: colors.primary,
  },

  editProfileBox: {
    marginHorizontal: 20,
    marginTop: 10,
    position: "relative",
  },
  eye: {
    position: "absolute",
    right: 0,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    top: 28,
  },
  inputText: {
    marginBottom: 5,
    fontSize: Platform.OS === "ios" ? 15 : 13,
    // fontFamily: "//NunitoSans-Regular",
    fontWeight: "600",
  },

  formInput: {
    borderWidth: 0.4,
    height: Platform.OS === "ios" ? 55 : 50,
    padding: 10,
    borderRadius: 5,
    borderColor: colors.textLighter,
    fontSize: 15,
  },
  forgotPassword: {
    color: colors.primary,
    marginTop: 20,
    alignSelf: "flex-end",
    marginHorizontal: 20,
  },
  profileButton: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: Platform.OS === "ios" ? 55 : 50,
  },

  profileButtonText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: Platform.OS === "ios" ? 16 : 14,
  },

  member: {
    marginTop: 20,
    marginBottom: 120,
    alignSelf: "center",
    fontSize: 17,
    // fontFamily: "//NunitoSans-Regular",
  },
  login: {
    color: colors.primary,
  },
  errors: {
    color: "red",
    marginTop: 5,
    marginBottom: 10,
    fontSize: Platform.OS === "ios" ? 13 : 12,
  },

  error: {
    color: colors.white,
    marginBottom: 20,
    fontSize: Platform.OS === "ios" ? 15 : 14,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "orangered",
    fontWeight: "bold",
    width: "90%",
    textAlign: "center",
  },
  helpWrapper: {
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: colors.light,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  helpHeading: {
    fontSize: 16,
    fontFamily: "NunitoSans-Regular",
  },
  helpBox: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  helpText: {
    textDecorationLine: "underline",
    color: colors.primary,
    fontSize: 15,
  },
});
