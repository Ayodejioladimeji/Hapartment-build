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
} from "react-native";
import React, { useState } from "react";
import colors from "../assets/colors/colors";
import GoBack from "../common/GoBack";
import { useNavigation } from "@react-navigation/native";
import EmailValidator from "email-validator";
import { Formik } from "formik";
import { register } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

// VALIDATION REGEX
const passwordUpper = /(?=.*[A-Z])/;
const passwordSpecial = /(?=.*[!@#$%^&*])/;
const passwordLower = /(?=.*[a-z])/;
const passwordRegex = /(?=.*[0-9])/;

//

const Register = ({ route }) => {
  const navigation = useNavigation();
  const userType = route.params;
  const dispatch = useDispatch();
  const { authloading, error } = useSelector((state) => state.alert);
  const [typePassword, setTypePassword] = useState(false);
  const [typePass, setTypePass] = useState(false);

  //

  return (
    <Formik
      initialValues={{
        fullname: "",
        email: "",
        username: "",
        password: "",
        password2: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        const { fullname, email, username, password } = values;
        setTimeout(async () => {
          const newData = {
            fullname,
            email: email.toLowerCase(),
            username: username.toLowerCase(),
            password,
            userType,
          };
          dispatch(register(newData, navigation));

          setSubmitting(false);
        }, 500);
      }}
      //   HANDLING VALIDATION MESSAGES
      validate={(values) => {
        let errors = {};

        if (!values.fullname) {
          errors.fullname = "fullname is required";
        }

        if (!values.email) {
          errors.email = "Email is required";
        } else if (!EmailValidator.validate(values.email)) {
          errors.email = "Invalid email address";
        }

        if (!values.username) {
          errors.username = "Username is required";
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

        if (!values.password2) {
          errors.password2 = "Confirm password is required";
        } else if (values.password !== values.password2) {
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
            <GoBack navigation={navigation} title="Register" />

            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.registerContainer}>
                <Text style={styles.heading}>Create an account</Text>

                {error && <Text style={styles.error}>{error}</Text>}

                <View stye={styles.formContainer}>
                  <View style={styles.editProfileBox}>
                    <Text style={styles.inputText}>Fullname</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Provide your fullname"
                      onChangeText={handleChange("fullname")}
                      onBlur={handleBlur("fullname")}
                      value={values.fullname}
                      name="fullname"
                    />
                    {errors.fullname && touched.fullname && (
                      <Text style={styles.errors}>{errors.fullname}</Text>
                    )}
                  </View>

                  <View style={styles.editProfileBox}>
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Provide your email"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      name="email"
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errors}>{errors.email}</Text>
                    )}
                  </View>

                  <View style={styles.editProfileBox}>
                    <Text style={styles.inputText}>Username</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Provide your username"
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                      value={values.username}
                      name="username"
                    />
                    {errors.username && touched.username && (
                      <Text style={styles.errors}>{errors.username}</Text>
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
                    <Text style={styles.inputText}>Confirm password</Text>
                    <TextInput
                      secureTextEntry={typePass ? false : true}
                      style={styles.formInput}
                      placeholder="***********"
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
                        Create Account
                      </Text>
                    )}
                  </TouchableOpacity>

                  <Text style={styles.member}>
                    Already a member?{" "}
                    <Text
                      style={styles.login}
                      onPress={() => navigation.navigate("Login")}
                    >
                      Login
                    </Text>
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        );
      }}
    </Formik>
  );
};

export default Register;

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
    fontSize: Platform.OS === "ios" ? 15 : 14,
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
  profileButton: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: colors.primary,
    height: Platform.OS === "ios" ? 55 : 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
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
    fontSize: Platform.OS === "ios" ? 16 : 14,
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
