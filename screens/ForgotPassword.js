import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React from "react";
import colors from "../assets/colors/colors";
import GoBack from "../common/GoBack";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import EmailValidator from "email-validator";
import { Formik } from "formik";
import { forgotPassword } from "../redux/actions/authAction";

//

const ForgotPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { forgotpasswordsuccess, authloading, error } = useSelector(
    (state) => state.alert
  );

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          const newData = {
            email: values.email.toLowerCase(),
          };

          dispatch(forgotPassword(newData));
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

        //
        return (
          <View style={{ flex: 1, backgroundColor: colors.white }}>
            <GoBack navigation={navigation} title="Forgot Password" />

            <ScrollView>
              <View style={styles.registerContainer}>
                <Text style={styles.heading}>Forgot your Password ?</Text>
                <Text style={styles.subHeading}>
                  Enter the email address associated with your account and we
                  will send you a one-time-code to reset your password
                </Text>

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

                  <TouchableWithoutFeedback onPress={handleSubmit}>
                    <View style={styles.profileButton}>
                      {authloading ? (
                        <ActivityIndicator size="small" color={colors.white} />
                      ) : (
                        <Text style={styles.profileButtonText}>Get Code</Text>
                      )}
                    </View>
                  </TouchableWithoutFeedback>

                  <Text style={styles.member}>
                    Remember your password ?{" "}
                    <Text
                      onPress={() => navigation.navigate("Login")}
                      style={styles.login}
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

export default ForgotPassword;

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 30,
  },
  heading: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    // fontFamily: "//NunitoSans-ßBold",
    alignSelf: "center",
    marginBottom: 10,
    color: colors.primary,
  },

  subHeading: {
    alignSelf: "center",
    marginBottom: 30,
    fontSize: Platform.OS === "ios" ? 15 : 14,
    // fontFamily: "//NunitoSans-ßRegular",
    textAlign: "center",
    paddingHorizontal: 20,
  },

  editProfileBox: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  inputText: {
    marginBottom: 5,
    fontSize: 15,
    // fontFamily: "//NunitoSßans-Regular",
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
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  profileButtonText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: Platform.OS === "ios" ? 15 : 14,
  },

  member: {
    marginTop: 20,
    marginBottom: 120,
    alignSelf: "center",
    fontSize: Platform.OS === "ios" ? 15 : 14,
    // fontFamily: "//NunitoSanßs-Regular",
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
});
