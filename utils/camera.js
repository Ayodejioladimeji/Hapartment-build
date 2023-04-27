import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/hapartment/upload";

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
    const imageOne = result.assets[0].uri;

    let one = {
      uri: imageOne,
      type: `hapartment/${imageOne.split(".")[1]}`,
      name: `hapartment/${imageOne.split(".")[1]}`,
    };
    const dataOne = new FormData();
    dataOne.append("file", one);
    dataOne.append("upload_preset", "hapartment");
    dataOne.append("cloud_name", "hapartment");
    const documentOne = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: dataOne,
    });
    const oneUpload = await documentOne.json();

    const firstImage = {
      id: oneUpload.public_id,
      url: oneUpload.url,
    };
    dispatch({ type: GLOBALTYPES.IMAGE_ONE, payload: firstImage });
    // console.log(firstImage);

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
    const imageTwo = result.assets[0].uri;

    let two = {
      uri: imageTwo,
      type: `hapartment/${imageTwo.split(".")[1]}`,
      name: `hapartment/${imageTwo.split(".")[1]}`,
    };
    const dataTwo = new FormData();
    dataTwo.append("file", two);
    dataTwo.append("upload_preset", "hapartment");
    dataTwo.append("cloud_name", "hapartment");
    const documentTwo = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: dataTwo,
    });
    const twoUpload = await documentTwo.json();

    const secondImage = {
      id: twoUpload.public_id,
      url: twoUpload.url,
    };
    dispatch({ type: GLOBALTYPES.IMAGE_TWO, payload: secondImage });
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
    const imageThree = result.assets[0].uri;

    let three = {
      uri: imageThree,
      type: `hapartment/${imageThree.split(".")[1]}`,
      name: `hapartment/${imageThree.split(".")[1]}`,
    };
    const dataThree = new FormData();
    dataThree.append("file", three);
    dataThree.append("upload_preset", "hapartment");
    dataThree.append("cloud_name", "hapartment");
    const documentThree = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: dataThree,
    });
    const threeUpload = await documentThree.json();

    const thirdImage = {
      id: threeUpload.public_id,
      url: threeUpload.url,
    };
    dispatch({ type: GLOBALTYPES.IMAGE_THREE, payload: thirdImage });
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
    const imageFour = result.assets[0].uri;

    let Four = {
      uri: imageFour,
      type: `hapartment/${imageFour.split(".")[1]}`,
      name: `hapartment/${imageFour.split(".")[1]}`,
    };
    const dataFour = new FormData();
    dataFour.append("file", Four);
    dataFour.append("upload_preset", "hapartment");
    dataFour.append("cloud_name", "hapartment");
    const documentFour = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: dataFour,
    });
    const FourUpload = await documentFour.json();

    const secondImage = {
      id: FourUpload.public_id,
      url: FourUpload.url,
    };
    dispatch({ type: GLOBALTYPES.IMAGE_FOUR, payload: secondImage });
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
    const imageFive = result.assets[0].uri;

    let Five = {
      uri: imageFive,
      type: `hapartment/${imageFive.split(".")[1]}`,
      name: `hapartment/${imageFive.split(".")[1]}`,
    };
    const dataFive = new FormData();
    dataFive.append("file", Five);
    dataFive.append("upload_preset", "hapartment");
    dataFive.append("cloud_name", "hapartment");
    const documentFive = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: dataFive,
    });
    const FiveUpload = await documentFive.json();

    const secondImage = {
      id: FiveUpload.public_id,
      url: FiveUpload.url,
    };
    dispatch({ type: GLOBALTYPES.IMAGE_FIVE, payload: secondImage });
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
    const imageSix = result.assets[0].uri;

    let Six = {
      uri: imageSix,
      type: `hapartment/${imageSix.split(".")[1]}`,
      name: `hapartment/${imageSix.split(".")[1]}`,
    };
    const dataSix = new FormData();
    dataSix.append("file", Six);
    dataSix.append("upload_preset", "hapartment");
    dataSix.append("cloud_name", "hapartment");
    const documentSix = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: dataSix,
    });
    const SixUpload = await documentSix.json();

    const secondImage = {
      id: SixUpload.public_id,
      url: SixUpload.url,
    };
    dispatch({ type: GLOBALTYPES.IMAGE_SIX, payload: secondImage });
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
    const imageSeven = result.assets[0].uri;

    let Seven = {
      uri: imageSeven,
      type: `hapartment/${imageSeven.split(".")[1]}`,
      name: `hapartment/${imageSeven.split(".")[1]}`,
    };
    const dataSeven = new FormData();
    dataSeven.append("file", Seven);
    dataSeven.append("upload_preset", "hapartment");
    dataSeven.append("cloud_name", "hapartment");
    const documentSeven = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: dataSeven,
    });
    const SevenUpload = await documentSeven.json();

    const secondImage = {
      id: SevenUpload.public_id,
      url: SevenUpload.url,
    };
    dispatch({ type: GLOBALTYPES.IMAGE_SEVEN, payload: secondImage });
    setLoadingSeven(false);
  }
};

//
