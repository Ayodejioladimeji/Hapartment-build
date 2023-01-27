import {
  View,
  Text,
  Pressable,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef } from "react";
import MyStatusBar from "../common/MyStatusBar";
import colors from "../assets/colors/colors";
import GoBack from "../common/GoBack";
import { useNavigation } from "@react-navigation/native";
import OtpInput from "../components/OtpInput";
import { FontAwesome5 } from "@expo/vector-icons";
import { authenticate, resendCode } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

//

const OneTimeCode = () => {
  const navigation = useNavigation();
  const [otpCode, setOtpCode] = useState("");
  const { activation_token } = useSelector((state) => state.auth);
  const { authloading, error } = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const [isPinReady, setIsPinReady] = useState(false);
  const maximumCodeLength = 4;
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00");

  // console.log(email);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);

    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    setTimer("02:00");

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 120);
    return deadline;
  };

  // Resend code to the user
  const handleResend = () => {
    clearTimer(getDeadTime());
    const newData = {
      activationtoken: activation_token,
    };

    dispatch(resendCode(newData));
  };

  // handlesubmit
  const handleSubmit = () => {
    const newData = {
      activation_token,
      auth_code: otpCode,
    };

    dispatch(authenticate(newData, navigation));
  };

  //

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <GoBack navigation={navigation} title="One Time Code" />
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <View style={styles.codeWrapper}>
          <FontAwesome5 name="user-lock" style={styles.codeImage} />

          {error && <Text style={styles.error}>{error}</Text>}

          <Text style={styles.codeText}>
            Provide the one-time-code sent to your email
          </Text>

          <OtpInput
            code={otpCode}
            setCode={setOtpCode}
            maximumLength={maximumCodeLength}
            setIsPinReady={setIsPinReady}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!isPinReady}
            style={{
              backgroundColor: isPinReady ? colors.primary : colors.textLight,
              color: colors.white,
              height: 50,
              // width: 300,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
              borderRadius: 5,
            }}
          >
            {authloading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.resend}>Didn't get the code ? </Text>

          {timer === "00:00" ? (
            <Text onPress={handleResend} style={styles.resendCode}>
              Resend code
            </Text>
          ) : (
            <>
              <Text style={styles.resendCode}>Resend after</Text>

              <Text style={styles.timer}>{timer}</Text>
            </>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default OneTimeCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    backgroundColor: colors.white,
  },
  codeWrapper: {
    borderWidth: 0.3,
    borderColor: colors.textLighter,
    padding: 20,
    paddingVertical: 40,
    borderRadius: 5,
  },
  codeImage: {
    fontSize: 40,
    color: colors.primary,
    marginBottom: 30,
    alignSelf: "center",
  },
  codeText: {
    marginBottom: 30,
    fontSize: 19,
    marginHorizontal: 25,
    textAlign: "center",
    // fontFamily: "//NunitoSans-Bold",
    color: colors.primary,
  },
  codeButton: {},
  buttonText: {
    color: colors.white,
    // fontFamily: "//NunitoSans-Bold",
    fontSize: 18,
  },
  resend: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 15,
    // fontFamily: "//NunitoSans-Regular",
  },
  resendCode: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 15,
    color: colors.primary,
    // fontFamily: "//NunitoSans-Bold",
  },

  timer: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 25,
    color: colors.primary,
    // fontFamily: "//NunitoSans-Bold",
  },
  error: {
    color: colors.white,
    marginBottom: 20,
    fontSize: Platform.OS === "ios" ? 15 : 14,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "orangered",
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
});
