import { postDataApi, postDataApis } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

//

export const register = (data, navigation) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: true } });

    const res = await postDataApi("/register", data);

    dispatch({
      type: GLOBALTYPES.ACTIVATION_TOKEN,
      payload: res.data.activation_token,
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });

    setTimeout(() => {
      navigation.navigate("OneTimeCode");
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
    }, 3500);
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error?.response?.data?.msg },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
    }, 3000);
  }
};

// Authenticate the user code
export const authenticate = (data, navigation) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: true } });

    const res = await postDataApi("/authenticate", data);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.msg },
    });
    navigation.navigate("Login");
    dispatch({ type: GLOBALTYPES.ACTIVATION_TOKEN, payload: "" });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error?.response?.data?.msg },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
    }, 3000);
  }
};

// Resend OTP code to user
export const resendCode = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { resendloading: true } });

    const res = await postDataApi("/resend", data);

    dispatch({
      type: GLOBALTYPES.ACTIVATION_TOKEN,
      payload: res.data.activation_token,
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.msg },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { resendloading: false } });
    }, 3000);
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error?.response?.data?.msg },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
    }, 3000);
  }
};

// Login the user
export const login = (data, navigation) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: true } });

    const res = await postDataApi("/login", data);

    if (res.data.userData.isSuspended) {
      navigation.navigate("Suspended");
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
      return;
    }

    //  Save the data to the storage
    await AsyncStorage.setItem("access_token", res.data.access_token);

    // save the token to the state
    dispatch({
      type: GLOBALTYPES.TOKEN,
      payload: res.data.access_token,
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.msg },
    });

    setTimeout(() => {
      navigation.navigate("RootHome");
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
    }, 3000);
  } catch (error) {
    // console.log(error.response);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error?.response?.data?.msg },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
    }, 3000);
  }
};

// forgot password
export const forgotPassword = (data, navigation) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: true } });

    const res = await postDataApi("/forgotpassword", data);

    dispatch({
      type: GLOBALTYPES.ACTIVATION_TOKEN,
      payload: res.data.activation_token,
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.msg },
    });

    navigation.navigate("ResetPassword");
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error?.response?.data?.msg },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
    }, 3000);
  }
};

// reset password
export const resetPassword = (data, navigation) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: true } });

    const res = await postDataApi("/resetpassword", data);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.msg },
    });

    navigation.navigate("Login");
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error?.response?.data?.msg },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
    }, 3000);
  }
};

// change password
export const changePassword = (data, token, navigation) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: true } });

    const res = await postDataApis("/changepassword", data, token);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.msg },
    });

    setTimeout(() => {
      navigation.navigate("RootHome");
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: true } });
    }, 2000);
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error?.response?.data?.msg },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { authloading: false } });
    }, 2000);
  }
};
