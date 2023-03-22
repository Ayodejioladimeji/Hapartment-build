import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import { addComma } from "comma-separator";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

//

const SavedCard = ({ item }) => {
  const { saved_favorite, savedBy } = item;

  const {
    address,
    images,
    price,
    property_type,
    toilets,
    status,
    updatedAt,
    bathrooms,
  } = saved_favorite;

  const data = { savedBy, ...saved_favorite };
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // open delete modal
  const openModal = () => {
    let arr = [];

    saved_favorite.images.forEach((item) => {
      arr.push(item.id);
    });

    dispatch({
      type: GLOBALTYPES.DELETE_ID,
      payload: item._id,
    });
    dispatch({
      type: GLOBALTYPES.PUBLIC_ID,
      payload: arr,
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { deleteSaved: true },
    });
  };

  //
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("SavedDetailsScreen", { data })}
    >
      <View style={styles.cardsWrapper}>
        <View style={styles.imagesWrapper}>
          <Image source={{ uri: images[0].url }} style={styles.cardImage} />

          <View
            style={[
              styles.verify,
              status === "pending"
                ? { backgroundColor: "orange" }
                : status === "declined"
                ? { backgroundColor: "red" }
                : { backgroundColor: "green" },
            ]}
          >
            <Text style={styles.verifyText}>
              {status === "pending"
                ? "Pending"
                : status === "declined"
                ? "Declined"
                : "Verified"}
            </Text>
          </View>
        </View>

        <View style={styles.cardBox}>
          <Text style={styles.nameText}>
            {property_type.substring(0, 21) + "..."}
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

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.remove}
            onPress={openModal}
          >
            <FontAwesome5 name="times-circle" style={styles.removeIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SavedCard;

const styles = StyleSheet.create({
  cardsWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 2 },
    shadowRadius: 1,
    elevation: 1,
    width: "100%",
    marginBottom: 20,
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
    position: "relative",
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
  remove: {
    color: "red",
    position: "absolute",
    right: Platform.OS === "ios" ? 0 : 25,
    top: 0,
  },
  removeIcon: {
    fontSize: Platform.OS === "ios" ? 20 : 20,
    color: "red",
  },
});
