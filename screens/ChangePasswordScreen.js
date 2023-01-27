import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import colors from "../assets/colors/colors";
import GoBack from "../common/GoBack";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { changePassword } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

// VALIDATION REGEX
const passwordUpper = /(?=.*[A-Z])/;
const passwordSpecial = /(?=.*[!@#$%^&*])/;
const passwordLower = /(?=.*[a-z])/;
const passwordRegex = /(?=.*[0-9])/;

//

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.auth);
  const { authloading, error } = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const [typePassword, setTypePassword] = useState(false);
  const [typePass, setTypePass] = useState(false);

  //
  return (
    <Formik
      initialValues={{
        currentPassword: "",
        password: "",
        password2: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          const newData = {
            account_password: values.currentPassword,
            new_password: values.password,
          };
          // console.log(newData);
          dispatch(changePassword(newData, token));
          setSubmitting(false);
        }, 500);
      }}
      //   HANDLING VALIDATION MESSAGES
      validate={(values) => {
        let errors = {};

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

        if (values.password2 !== values.password) {
          errors.password2 = "Password does not match";
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
            <GoBack navigation={navigation} title="Password Change" />

            <ScrollView>
              <View style={styles.registerContainer}>
                <Text style={styles.heading}>Change your password</Text>

                {error && <Text style={styles.error}>{error}</Text>}

                <View stye={styles.formContainer}>
                  <View style={styles.editProfileBox}>
                    <Text style={styles.inputText}>Current Password</Text>
                    <TextInput
                      secureTextEntry={true}
                      style={styles.formInput}
                      placeholder="**********"
                      onChangeText={handleChange("currentPassword")}
                      onBlur={handleBlur("currentPassword")}
                      value={values.currentPassword}
                      name="password"
                    />
                    {errors.currentPassword && touched.currentPassword && (
                      <Text style={styles.errors}>
                        {errors.currentPassword}
                      </Text>
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
                    {errors.password && touched.password ? (
                      <Text style={styles.errors}>{errors.password}</Text>
                    ) : (
                      <Text style={styles.note}>
                        Password must be 8 characters long, one Uppercase, one
                        Number, one character
                      </Text>
                    )}

                    {/* password toggle */}
                    <TouchableWithoutFeedback
                      onPress={() => setTypePassword(!typePassword)}
                    >
                      <View style={styles.eye}>
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
                      </View>
                    </TouchableWithoutFeedback>
                  </View>

                  <View style={styles.editProfileBox}>
                    <Text style={styles.inputText}>Confirm Password</Text>
                    <TextInput
                      secureTextEntry={typePass ? false : true}
                      style={styles.formInput}
                      placeholder="**********"
                      onChangeText={handleChange("password2")}
                      onBlur={handleBlur("password2")}
                      value={values.password2}
                      name="password2"
                    />
                    {errors.password2 && touched.password2 && (
                      <Text style={styles.errors}>{errors.password2}</Text>
                    )}

                    {/* password toggle */}
                    <TouchableWithoutFeedback
                      onPress={() => setTypePass(!typePass)}
                    >
                      <View style={styles.eye}>
                        {typePass ? (
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
                      </View>
                    </TouchableWithoutFeedback>
                  </View>

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.profileButton}
                  >
                    {authloading ? (
                      <ActivityIndicator size="small" color={colors.white} />
                    ) : (
                      <Text style={styles.profileButtonText}>
                        change Password
                      </Text>
                    )}
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

export default ChangePasswordScreen;

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
    marginBottom: 50,
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
    fontSize: 15,
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
    textTransform: "uppercase",
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
  note: {
    color: colors.textLight,
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
});
