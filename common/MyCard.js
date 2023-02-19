import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  EvilIcons,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import { addComma } from "comma-separator";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { acquiredListing } from "../redux/actions/listingAction";

//

const MyCard = ({ item }) => {
  const {
    _id,
    address,
    images,
    price,
    property_type,
    toilets,
    status,
    updatedAt,
    bathrooms,
  } = item;
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // update listing method
  const updateListing = () => {
    dispatch({ type: GLOBALTYPES.IS_EDIT, payload: true });

    dispatch({
      type: GLOBALTYPES.UPDATE_ID,
      payload: _id,
    });
    navigation.navigate("UpdateProperty", { item });
  };

  // open delete modal
  const openModal = () => {
    let arr = [];

    images.forEach((item) => {
      arr.push(item.id);
    });

    dispatch({
      type: GLOBALTYPES.DELETE_ID,
      payload: _id,
    });
    dispatch({
      type: GLOBALTYPES.PUBLIC_ID,
      payload: arr,
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { deleteListing: true },
    });
  };

  //
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate("DetailsScreen", { item })}
        style={styles.cardsWrapper}
      >
        <View style={styles.imagesWrapper}>
          <Image source={{ uri: images[0].url }} style={styles.cardImage} />

          <View
            style={[
              styles.verify,
              status === "pending" && { backgroundColor: "orange" },
            ]}
          >
            <Text style={styles.verifyText}>
              {status === "pending" ? "Pending" : "Verified"}
            </Text>
          </View>
        </View>

        <View style={styles.cardBox}>
          <Text style={styles.nameText}>
            {property_type}
            {/* {name.substring(0, 25) + "..."} */}
          </Text>

          <Text style={styles.amountText}>₦{addComma(price)}</Text>

          <View style={styles.cardLocation}>
            <MaterialCommunityIcons
              name="map-marker"
              size={18}
              color={colors.textLight}
              style={{ marginLeft: -3 }}
            />
            <Text style={styles.locationText}>
              {address.substring(0, 27) + "..."}
            </Text>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.cardFooterBox}>
              <Ionicons name="bed-outline" size={14} color={colors.textLight} />
              <Text style={styles.footerBoxText}>2 Bed</Text>
            </View>
            <View style={styles.cardFooterBox}>
              <FontAwesome5 name="bath" size={11} color={colors.textLight} />
              <Text style={styles.footerBoxText}>{bathrooms} Bath</Text>
            </View>
            <View style={styles.cardFooterBox}>
              <FontAwesome5 name="toilet" size={11} color={colors.textLight} />
              <Text style={styles.footerBoxText}>{toilets} Toilet</Text>
            </View>
          </View>

          <View style={styles.cardTimeWrapper}>
            <Text style={styles.cardTime}>
              Updated : {format(updatedAt).substring(0, 25) + " "}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.cardAction}>
        <TouchableOpacity
          onPress={updateListing}
          activeOpacity={0.7}
          style={styles.action}
        >
          <MaterialIcons name="update" size={20} color={colors.primary} />
          <Text style={styles.update}>update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={openModal}
          activeOpacity={0.7}
          style={styles.action}
        >
          <EvilIcons name="trash" size={20} color="red" />
          <Text style={styles.delete}>delete</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={handleAcquired}
          activeOpacity={0.7}
          style={styles.actionDelete}
        >
          <Text style={styles.delete}>Property rented</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default MyCard;

const styles = StyleSheet.create({
  cardsWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 2 },
    shadowRadius: 1,
    elevation: 1,
    width: "100%",
    // marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.2,
    borderColor: colors.textLighter,
    padding: 5,
    borderBottomColor: colors.primary,
    overflow: "hidden",
  },
  imagesWrapper: {
    position: "relative",
    backgroundColor: colors.light,
  },
  cardImage: {
    height: 150,
    width: 150,
    // resizeMode: "cover",
  },

  cardBox: {
    // padding: 10,
    paddingHorizontal: 5,
    width: "60%",
  },
  cardName: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    fontWeight: "700",
    color: colors.black,
  },

  nameText: {
    fontWeight: "600",
    fontSize: Platform.OS === "ios" ? 13 : 12,
    // fontFamily: "//NunitoSans-Bold",
    marginBottom: 10,
  },

  amountText: {
    fontWeight: "700",
    fontSize: Platform.OS === "ios" ? 14 : 13,
    marginBottom: 10,
  },

  cardLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationText: {
    marginLeft: 2,
    color: colors.black,
    fontSize: 11,
    // fontFamily: "//NunitoSans-Regular",
    flexWrap: "wrap",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: colors.black,
    marginTop: 3,
  },
  cardFooterBox: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 13,
  },
  footerBoxText: {
    color: colors.black,
    fontSize: 9,
    marginLeft: 3,
    // fontFamily: "//NunitoSans-Regular",
  },
  cardTimeWrapper: {
    marginTop: 15,
    borderTopWidth: 0.3,
    borderColor: colors.textLighter,
    paddingTop: 7,
  },
  cardTime: {
    color: colors.textLight,
    fontSize: 11,
    // fontFamily: "//NunitoSans-Regular",
  },

  verify: {
    backgroundColor: colors.primary,
    height: Platform.OS === "ios" ? 20 : 20,
    paddingLeft: 10,
    width: "50%",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    // borderTopRightRadius: 30,
  },
  verifyText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "600",
  },
  favoriteWrapper: {
    position: "absolute",
    top: 10,
    right: 10,
    height: 25,
    width: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.textLighter,
    borderRadius: 50,
  },
  favorite: {
    color: colors.white,
    fontSize: 17,
  },
  cardAction: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.3,
    borderTopWidth: 0,
    borderColor: colors.textLight,
    padding: 10,
    justifyContent: "space-between",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
  },
  update: {
    color: colors.primary,
    fontSize: 14,
    textTransform: "capitalize",
    // marginRight: 35,
  },
  delete: {
    color: "red",
    fontSize: 14,
    textTransform: "capitalize",
  },
});
