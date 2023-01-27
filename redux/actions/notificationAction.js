import { Alert } from "react-native";
import {
  deleteDataApi,
  getDataApi,
  postDataApi,
  postDataApis,
} from "../../utils/fetchData";
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

      Alert.alert(res.data.msg);

      dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback });
      navigation.navigate("NotificationScreen");
      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.LOADING,
          payload: { createnotificationloading: false },
        });
      }, 1000);
    } catch (error) {
      Alert.alert(error.response.data.msg);

      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.LOADING,
          payload: { createnotificationloading: false },
        });
      }, 1000);
    }
  };

// GET NOTIFICATIONS CREATED
export const getNotifications = (token) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: { getnotificationloading: true },
    });

    const res = await getDataApi("/my_notifications", token);

    dispatch({ type: GLOBALTYPES.MY_NOTIFICATION, payload: res.data });

    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: { getnotificationloading: false },
    });
  } catch (error) {
    Alert.alert(error.response.data.msg);

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
    Alert.alert(error.response.data.msg);

    setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: { deletenotificationloading: false },
      });
    }, 1000);
  }
};
