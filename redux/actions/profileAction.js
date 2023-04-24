import { getDataApi, getDataApis, patchDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

//

// Edit user profile
export const profile = (data, token, profile_callback) => async (dispatch) => {
  try {
    const res = await patchDataApi("/updateUser", data, token);

    dispatch({
      type: GLOBALTYPES.PROFILE_CALLBACK,
      payload: !profile_callback,
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { authenticate: res.data.msg },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    }, 1000);
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    }, 3000);
  }
};

// verify Agent identity
export const identity =
  (data, token, navigation, profile_callback) => async (dispatch) => {
    try {
      const res = await patchDataApi("/verifyagent", data, token);

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.msg },
      });

      dispatch({
        type: GLOBALTYPES.PROFILE_CALLBACK,
        payload: !profile_callback,
      });

      navigation.navigate("RootHome");
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error?.response?.data?.msg },
      });

      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      }, 2000);
    }
  };

// Get all agent
export const allAgent = () => async (dispatch) => {
  try {
    // dispatch({ type: GLOBALTYPES.LOADING, payload: { allagentloading: true } });

    const res = await getDataApis("/all_agents");

    dispatch({ type: GLOBALTYPES.ALL_AGENTS, payload: res.data });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.LOADING, payload: {} });
    }, 3000);
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.LOADING, payload: {} });
    }, 3000);
  }
};

// Get all agent details
export const agentDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: { agentdetailsloading: true },
    });

    const res = await getDataApis(`/agent_details/${id}`);

    dispatch({ type: GLOBALTYPES.AGENT_DETAILS, payload: res.data });

    setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: { agentdetailsloading: false },
      });
    }, 3000);
  } catch (error) {
    // console.log(error.response.data.msg);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.LOADING, payload: {} });
    }, 3000);
  }
};
