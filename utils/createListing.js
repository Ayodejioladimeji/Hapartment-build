import { Alert } from "react-native";
import { createListing, updateListing } from "../redux/actions/listingAction";
// import { CLOUDINARY_URL } from "@env";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/hapartment/upload";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

const CreateListings = async (
  address,
  property_type,
  state,
  city,
  statename,
  cityname,
  bathrooms,
  toilets,
  furnishing,
  home_facilities,
  area_facilities,
  description,
  price,
  category,
  bedrooms,
  video,
  imageOne,
  imageTwo,
  imageThree,
  imageFour,
  imageFive,
  imageSix,
  imageSeven,
  dispatch,
  token,
  listing_callback,
  navigation
) => {
  // validate the input

  if (
    address === "" ||
    property_type === "" ||
    state === "" ||
    city === "" ||
    bathrooms === "" ||
    toilets === "" ||
    furnishing === "" ||
    home_facilities.length === 0 ||
    area_facilities.length === 0 ||
    description === "" ||
    price === "" ||
    category === ""
  ) {
    Alert.alert("Please fill all required input");
    return;
  }

  if (
    !imageOne ||
    !imageTwo ||
    !imageThree ||
    !imageFour ||
    !imageFive ||
    !imageSix ||
    !imageSeven
  ) {
    Alert.alert("Please select all seven (7) images");
    return;
  }

  dispatch({
    type: GLOBALTYPES.LOADING,
    payload: { createlistingloading: true },
  });

  let one = {
    uri: imageOne,
    type: `hapartment/${imageOne.split(".")[1]}`,
    name: `hapartment/${imageOne.split(".")[1]}`,
  };
  let two = {
    uri: imageTwo,
    type: `hapartment/${imageTwo.split(".")[1]}`,
    name: `hapartment/${imageTwo.split(".")[1]}`,
  };
  let three = {
    uri: imageThree,
    type: `hapartment/${imageThree.split(".")[1]}`,
    name: `hapartment/${imageThree.split(".")[1]}`,
  };
  let four = {
    uri: imageFour,
    type: `hapartment/${imageFour.split(".")[1]}`,
    name: `hapartment/${imageFour.split(".")[1]}`,
  };
  let five = {
    uri: imageFive,
    type: `hapartment/${imageFive.split(".")[1]}`,
    name: `hapartment/${imageFive.split(".")[1]}`,
  };
  let six = {
    uri: imageSix,
    type: `hapartment/${imageSix.split(".")[1]}`,
    name: `hapartment/${imageSix.split(".")[1]}`,
  };
  let seven = {
    uri: imageSeven,
    type: `hapartment/${imageSeven.split(".")[1]}`,
    name: `hapartment/${imageSeven.split(".")[1]}`,
  };

  // send image to cloudinary
  const dataOne = new FormData();
  const dataTwo = new FormData();
  const dataThree = new FormData();
  const dataFour = new FormData();
  const dataFive = new FormData();
  const dataSix = new FormData();
  const dataSeven = new FormData();

  dataOne.append("file", one);
  dataTwo.append("file", two);
  dataThree.append("file", three);
  dataFour.append("file", four);
  dataFive.append("file", five);
  dataSix.append("file", six);
  dataSeven.append("file", seven);

  dataOne.append("upload_preset", "hapartment");
  dataTwo.append("upload_preset", "hapartment");
  dataThree.append("upload_preset", "hapartment");
  dataFour.append("upload_preset", "hapartment");
  dataFive.append("upload_preset", "hapartment");
  dataSix.append("upload_preset", "hapartment");
  dataSeven.append("upload_preset", "hapartment");

  //
  dataOne.append("cloud_name", "hapartment");
  dataTwo.append("cloud_name", "hapartment");
  dataThree.append("cloud_name", "hapartment");
  dataFour.append("cloud_name", "hapartment");
  dataFive.append("cloud_name", "hapartment");
  dataSix.append("cloud_name", "hapartment");
  dataSeven.append("cloud_name", "hapartment");

  const documentOne = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: dataOne,
  });
  const documentTwo = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: dataTwo,
  });
  const documentThree = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: dataThree,
  });
  const documentFour = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: dataFour,
  });
  const documentFive = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: dataFive,
  });
  const documentSix = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: dataSix,
  });
  const documentSeven = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: dataSeven,
  });

  const oneUpload = await documentOne.json();
  const twoUpload = await documentTwo.json();
  const threeUpload = await documentThree.json();
  const fourUpload = await documentFour.json();
  const fiveUpload = await documentFive.json();
  const sixUpload = await documentSix.json();
  const sevenUpload = await documentSeven.json();

  const newImages = [
    { id: oneUpload.public_id, url: oneUpload.secure_url },
    { id: twoUpload.public_id, url: twoUpload.secure_url },

    { id: threeUpload.public_id, url: threeUpload.secure_url },

    { id: fourUpload.public_id, url: fourUpload.secure_url },

    { id: fiveUpload.public_id, url: fiveUpload.secure_url },

    { id: sixUpload.public_id, url: sixUpload.secure_url },

    { id: sevenUpload.public_id, url: sevenUpload.secure_url },
  ];

  const newData = {
    address: address.toLowerCase(),
    property_type: property_type.toLowerCase(),
    country: "NG",
    state: state.toLowerCase(),
    city: city.toLowerCase(),
    statename: statename.toLowerCase(),
    cityname: cityname.toLowerCase(),
    bedrooms,
    bathrooms,
    toilets,
    furnishing: furnishing.toLowerCase(),
    home_facilities,
    area_facilities,
    description: description.toLowerCase(),
    price,
    category: category.toLowerCase(),
    video,
    images: newImages,
  };

  dispatch(createListing(newData, token, listing_callback, navigation));
};

export default CreateListings;
