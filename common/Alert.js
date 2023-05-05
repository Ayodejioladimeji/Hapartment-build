import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Popup from "./Popup";
import { useNavigation } from "@react-navigation/native";
import IdentityVerificationModal from "./identityVerificationModal";
import ListingSuccess from "./ListingSucces";
import LoginErrorModal from "./LoginErrorModal";
import DeleteModal from "./DeleteModals";
import UpdateListingSuccess from "./UpdateListingSuccessss";
import ListingErrorModal from "./ListingErrorModal";
import RemoveSavedProperty from "./RemoveSavedProperty";

//

const Alert = () => {
  const {
    success,
    authenticate,
    forgotpasswordsuccess,
    resetpasswordsuccess,
    changepasswordsuccess,
    authenticateUser,
    verifyagent,
    createListingSuccess,
    updateListingSuccess,
    loginerror,
    deleteListing,
    listingError,
    deleteSaved,
  } = useSelector((state) => state.alert);
  const navigation = useNavigation();

  //
  return (
    <View>
      {success && (
        <Popup
          image={require("../assets/images/success.png")}
          text={success}
          navigation={navigation}
        />
      )}

      {forgotpasswordsuccess && (
        <Popup
          image={require("../assets/images/gmail.png")}
          text={forgotpasswordsuccess}
          navigation={navigation}
        />
      )}

      {resetpasswordsuccess && (
        <Popup
          image={require("../assets/images/success.png")}
          text={resetpasswordsuccess}
          navigation={navigation}
        />
      )}

      {changepasswordsuccess && (
        <Popup
          image={require("../assets/images/success.png")}
          text={changepasswordsuccess}
          buttonText="OK"
          navigation={navigation}
        />
      )}

      {authenticate && (
        <Popup
          image={require("../assets/images/success.png")}
          text={authenticate}
          buttonText="OK"
          navigation={navigation}
        />
      )}

      {authenticateUser && (
        <Popup
          image={require("../assets/images/success.png")}
          text={authenticateUser}
          buttonText="OK"
          navigation={navigation}
        />
      )}

      {createListingSuccess && <ListingSuccess />}

      {updateListingSuccess && <UpdateListingSuccess />}

      {listingError && <ListingErrorModal />}

      {loginerror && <LoginErrorModal />}

      {verifyagent && <IdentityVerificationModal />}

      {deleteListing && <DeleteModal />}

      {deleteSaved && <RemoveSavedProperty />}
    </View>
  );
};

export default Alert;
