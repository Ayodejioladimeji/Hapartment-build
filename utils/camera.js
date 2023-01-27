import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

export const chooseImageOne = async (dispatch, setLoadingOne) => {
  setLoadingOne(true);

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    // selectionLimit: 7,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (result.canceled) {
    Alert.alert("You cancelled image uploads");
    setLoadingOne(false);
    return;
  }

  // const file = result.assets;
  // const err = checkImage(file);

  // if (err) {
  //   Alert.alert(err);
  //   setLoading(false);
  //   return;
  // }

  if (!result.canceled) {
    dispatch({ type: GLOBALTYPES.IMAGE_ONE, payload: result.assets[0].uri });
    setLoadingOne(false);
  }
};

export const chooseImageTwo = async (dispatch, setLoadingTwo) => {
  setLoadingTwo(true);

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    // selectionLimit: 7,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (result.canceled) {
    Alert.alert("You cancelled image uploads");
    setLoadingTwo(false);
    return;
  }

  // const file = result.assets;
  // const err = checkImage(file);

  // if (err) {
  //   Alert.alert(err);
  //   setLoading(false);
  //   return;
  // }

  if (!result.canceled) {
    dispatch({ type: GLOBALTYPES.IMAGE_TWO, payload: result.assets[0].uri });
    setLoadingTwo(false);
  }
};

export const chooseImageThree = async (dispatch, setLoadingThree) => {
  setLoadingThree(true);

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    // selectionLimit: 7,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (result.canceled) {
    Alert.alert("You cancelled image uploads");
    setLoadingThree(false);
    return;
  }

  // const file = result.assets;
  // const err = checkImage(file);

  // if (err) {
  //   Alert.alert(err);
  //   setLoading(false);
  //   return;
  // }

  if (!result.canceled) {
    dispatch({ type: GLOBALTYPES.IMAGE_THREE, payload: result.assets[0].uri });
    setLoadingThree(false);
  }
};

export const chooseImageFour = async (dispatch, setLoadingFour) => {
  setLoadingFour(true);

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    // selectionLimit: 7,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (result.canceled) {
    Alert.alert("You cancelled image uploads");
    setLoadingFour(false);
    return;
  }

  // const file = result.assets;
  // const err = checkImage(file);

  // if (err) {
  //   Alert.alert(err);
  //   setLoading(false);
  //   return;
  // }

  if (!result.canceled) {
    dispatch({ type: GLOBALTYPES.IMAGE_FOUR, payload: result.assets[0].uri });
    setLoadingFour(false);
  }
};

export const chooseImageFive = async (dispatch, setLoadingFive) => {
  setLoadingFive(true);

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    // selectionLimit: 7,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (result.canceled) {
    Alert.alert("You cancelled image uploads");
    setLoadingFive(false);
    return;
  }

  // const file = result.assets;
  // const err = checkImage(file);

  // if (err) {
  //   Alert.alert(err);
  //   setLoading(false);
  //   return;
  // }

  if (!result.canceled) {
    dispatch({ type: GLOBALTYPES.IMAGE_FIVE, payload: result.assets[0].uri });
    setLoadingFive(false);
  }
};

export const chooseImageSix = async (dispatch, setLoadingSix) => {
  setLoadingSix(true);

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    // selectionLimit: 7,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (result.canceled) {
    Alert.alert("You cancelled image uploads");
    setLoadingSix(false);
    return;
  }

  // const file = result.assets;
  // const err = checkImage(file);

  // if (err) {
  //   Alert.alert(err);
  //   setLoading(false);
  //   return;
  // }

  if (!result.canceled) {
    dispatch({ type: GLOBALTYPES.IMAGE_SIX, payload: result.assets[0].uri });
    setLoadingSix(false);
  }
};

export const chooseImageSeven = async (dispatch, setLoadingSeven) => {
  setLoadingSeven(true);

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    // selectionLimit: 7,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (result.canceled) {
    Alert.alert("You cancelled image uploads");
    setLoadingSeven(false);
    return;
  }

  // const file = result.assets;
  // const err = checkImage(file);

  // if (err) {
  //   Alert.alert(err);
  //   setLoading(false);
  //   return;
  // }

  if (!result.canceled) {
    dispatch({ type: GLOBALTYPES.IMAGE_SEVEN, payload: result.assets[0].uri });
    setLoadingSeven(false);
  }
};

//
