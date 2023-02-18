import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import { format } from "timeago.js";
import { addComma } from "comma-separator";
import { saveProperties } from "../redux/actions/listingAction";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import Modals from "./Modals";
import CautionModal from "./CautionModal";

//

const Cards = ({ item, navigation }) => {
  const { callback } = useSelector((state) => state.property);
  const { modal } = useSelector((state) => state.notification);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // add favourite method
  const saveProperty = () => {
    if (token === "") {
      Alert.alert("Kindly login to save properties");
      return;
    }

    setLoading(true);

    const data = {
      list_id: item._id,
    };
    dispatch(saveProperties(data, token, callback));

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // Display a caution modal before going to the details page
  const caution = () => {
    if (item.status === "pending") {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      navigation.navigate("DetailsScreen", { item });
    }
  };

  //
  return (
    <>
      <TouchableWithoutFeedback onPress={caution}>
        <View style={styles.cardWrapper}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: item.images[0].url }}
              style={styles.cardImage}
            />
            <View
              style={[
                styles.verify,
                item.status === "pending" && { backgroundColor: "orange" },
              ]}
            >
              <Text style={styles.verifyText}>{item.status}</Text>
            </View>

            <TouchableOpacity
              onPress={saveProperty}
              activeOpacity={0.5}
              style={styles.favoriteWrapper}
            >
              {loading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <MaterialIcons name="favorite" style={styles.favorite} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.cardBox}>
            <View style={styles.cardName}>
              <Text style={styles.nameText}>
                {item.property_type.substring(0, 15) + "..."}
              </Text>
              <Text style={styles.amountText}>₦{addComma(item.price)}</Text>
            </View>

            <View style={styles.cardLocation}>
              <MaterialCommunityIcons
                name="map-marker"
                size={18}
                color={colors.textLight}
                style={{ marginLeft: -3 }}
              />
              <Text style={styles.locationText}>
                {item.address.substring(0, 27) + "..."}
              </Text>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.cardFooterBox}>
                <Ionicons
                  name="bed-outline"
                  size={15}
                  color={colors.textLight}
                />
                <Text style={styles.footerBoxText}>2 Bed</Text>
              </View>
              <View style={styles.cardFooterBox}>
                <FontAwesome5 name="bath" size={12} color={colors.textLight} />
                <Text style={styles.footerBoxText}>{item.bathrooms} Bath</Text>
              </View>
              <View style={styles.cardFooterBox}>
                <FontAwesome5
                  name="toilet"
                  size={12}
                  color={colors.textLight}
                />
                <Text style={styles.footerBoxText}>{item.toilets} Toilet</Text>
              </View>
            </View>

            <View style={styles.cardTimeWrapper}>
              <Text style={styles.cardTime}>
                Property updated : {format(item.updatedAt)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {modal && (
        <Modals>
          <CautionModal item={item} />
        </Modals>
      )}
    </>
  );
};

export default Cards;

const styles = StyleSheet.create({
  cardWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    width: Platform.OS === "ios" ? 230 : 210,
    height: 280,
    marginRight: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  // 'ul > li:not(:last-child)'

  imageWrapper: {
    position: "relative",
    backgroundColor: colors.light,
  },

  cardImage: {
    height: 140,
    width: "100%",
  },

  cardBox: {
    padding: 10,
  },
  cardName: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    fontWeight: "700",
    color: colors.black,
    // fontFamily: "//NunitoSans-Bold",
  },

  nameText: {
    fontWeight: "600",
    fontSize: Platform.OS === "ios" ? 13 : 11,
    // fontFamily: "//NunitoSans-Bold",
  },

  amountText: {
    fontWeight: "700",
    fontSize: Platform.OS === "ios" ? 13 : 12,
  },

  cardLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationText: {
    marginLeft: 2,
    color: colors.black,
    fontSize: Platform.OS === "ios" ? 12 : 11,
    // fontFamily: "//NunitoSans-Regular",
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
    fontSize: Platform.OS === "ios" ? 12 : 11,
    marginLeft: 3,
    // fontFamily: "//NunitoSans-Regular",
  },
  cardTimeWrapper: {
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: colors.textLighter,
    paddingTop: 7,
  },
  cardTime: {
    color: colors.black,
    fontSize: Platform.OS === "ios" ? 12 : 11,
    // fontFamily: "//NunitoSans-Regular",
  },
  verify: {
    backgroundColor: colors.primary,
    height: Platform.OS === "ios" ? 20 : 20,
    paddingLeft: 10,
    width: "40%",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    borderTopRightRadius: 10,
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
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.textLighter,
    borderRadius: 50,
  },
  favorite: {
    color: colors.white,
    fontSize: 20,
  },
});
