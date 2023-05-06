import { Alert } from "react-native";
import { deleteDataApi, getDataApi, postDataApis } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

// CREATE NOTIFICATON
export const createNotification =
  (data, token, callback, navigation) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: { createnotificationloading: true },
      });

      const res = await postDataApis("/create_notification", data, token);

      dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback });
      navigation.navigate("NotificationScreen");
      Alert.alert(res.data.msg);

      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: { createnotificationloading: false },
      });
    } catch (error) {
      Alert.alert(error?.response?.data?.msg);

      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: { createnotificationloading: false },
      });
    }
  };

// GET NOTIFICATIONS CREATED
export const getNotifications = (token, setLoading) => async (dispatch) => {
  try {
    const res = await getDataApi("/my_notifications", token);

    dispatch({ type: GLOBALTYPES.MY_NOTIFICATION, payload: res.data });

    setLoading(false);
  } catch (error) {
    Alert.alert(error?.response?.data?.msg);

    setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: { getnotificationloading: false },
      });
    }, 1000);
  }
};

// DELETE NOTIFICATIONS
export const deleteNotification = (id, token, callback) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: { deletenotificationloading: true },
    });

    const res = await deleteDataApi(`/delete_notification/${id}`, token);

    dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback });

    Alert.alert(res.data.msg);

    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: { deletenotificationloading: false },
    });
  } catch (error) {
    Alert.alert(error?.response?.data?.msg);

    setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: { deletenotificationloading: false },
      });
    }, 1000);
  }
};
